import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInviteDto } from './dto/create-user_invite.dto';
import { UserInvite } from './entities/invite.entity';
import {
  ResponseMessage,
  ResponseStatus,
} from '../../code/response-status.enum';
import * as moment from 'moment/moment';
import { User } from '../entities/user.entity';
import { UserIntegralLog } from '../integral_log/entities/integral_log.entity';
import { UserTask } from '../task/entities/task.entity';
import { UserTaskLog } from '../task_log/entities/task_log.entity';
import { ChatService } from '../../socket/chat.service';
import { Logger } from '../../tool/log/log4js';

@Injectable()
export class UserInviteService {
  constructor(
    @InjectRepository(UserInvite)
    private userInviteRepository: Repository<UserInvite>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserIntegralLog)
    private userIntegralLogRepository: Repository<UserIntegralLog>,
    @InjectRepository(UserTask)
    private userTaskRepository: Repository<UserTask>,
    @InjectRepository(UserTaskLog)
    private taskLogRepository: Repository<UserTaskLog>,
    private readonly chatService: ChatService,
  ) {}

  async create(createUserInviteDto: CreateUserInviteDto, req) {
    //检查用户是否被邀请
    const invite = await this.userInviteRepository.findOneBy({
      invite_user_id: req.user.id,
    });
    if (invite) {
      throw new HttpException(
        ResponseMessage.USER_ALREADY_INVITE,
        ResponseStatus.USER_ALREADY_INVITE,
      );
    }
    //检查邀请用户
    const user = await this.userRepository.findOneBy({
      id: createUserInviteDto.user_id,
    });
    if (!user) {
      throw new HttpException(
        ResponseMessage.USER_NOT_EXIST,
        ResponseStatus.USER_NOT_EXIST,
      );
    }
    createUserInviteDto.invite_user_id = req.user.id;
    createUserInviteDto.date = moment().format('YYYY-MM-DD');
    const inviteModel = await this.userInviteRepository.save(
      createUserInviteDto,
    );
    //赠送积分
    const check = await this.checkTask(
      inviteModel,
      createUserInviteDto.user_id,
    );
    if (check) {
      this.addIntegral(createUserInviteDto.user_id, check);
      this.addIntegralLog(createUserInviteDto.user_id, check);
      this.addTaskLog(createUserInviteDto.user_id, check);
    }
    return invite;
  }

  async findAll(query, req) {
    return await this.userInviteRepository.find();
  }

  //检查是否达成任务
  async checkTask(inviteModel: UserInvite, id) {
    const count = await this.userInviteRepository.countBy({
      user_id: id,
      date: moment().format('YYYY-MM-DD'),
    });
    let taskName = '';
    switch (count) {
      case 1:
        taskName = 'Invite_one_friend';
        break;
      case 3:
        taskName = 'Invite_three_friends';
        break;
      case 5:
        taskName = 'Invite_five_friends';
        break;
    }
    return await this.userTaskRepository.findOneBy({
      identification: taskName,
    });
  }

  //增加积分
  async addIntegral(id: number, check) {
    const exitsUser = await this.userRepository.findOneBy({ id: id });
    if (!exitsUser) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    exitsUser.integral += check.integral;
    this.userRepository.save(exitsUser);

    const sockets = this.chatService.get(String(id));
    if (sockets) {
      Logger.info('socket发送消息：' + id + exitsUser.integral);
      sockets.forEach(
        (socket) => socket.emit('user_integral'),
        exitsUser.integral,
      );
    }
  }

  //积分记录
  async addIntegralLog(id: number, check) {
    const integralLog = new UserIntegralLog();
    integralLog.user_id = id;
    integralLog.integral = check.integral;
    integralLog.name = check.name + '奖励';
    integralLog.date = moment().format('YYYY-MM-DD');
    await this.userIntegralLogRepository.save(integralLog);
  }

  //任务完成记录
  async addTaskLog(id: number, check) {
    const userTaskLog = new UserTaskLog();
    userTaskLog.user_id = id;
    userTaskLog.user_task_id = check.id;
    userTaskLog.integral = check.integral;
    userTaskLog.date = moment().format('YYYY-MM-DD');
    this.taskLogRepository.save(userTaskLog);
  }
}
