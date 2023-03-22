import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import { CreateClockDto } from './dto/create-clock.dto';
import { UserClockInLog } from './entities/clock_in_log.entity';
import * as moment from 'moment';
import {
  ResponseMessage,
  ResponseStatus,
} from '../../code/response-status.enum';
import { User } from '../entities/user.entity';
import { UserIntegralLog } from '../integral_log/entities/integral_log.entity';

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(UserClockInLog)
    private clockRepository: Repository<UserClockInLog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserIntegralLog)
    private userIntegralLogRepository: Repository<UserIntegralLog>,
  ) {}

  async create(createClockDto: CreateClockDto, req) {
    //检查是否已签到
    const todayClock = await this.clockRepository.findOne({
      order: {
        id: 'DESC',
      },
      where: { user_id: req.user.id, date: moment().format('YYYY-MM-DD') },
    });
    if (todayClock) {
      throw new HttpException(
        ResponseMessage.USER_ALREADY_CLOCK_IN,
        ResponseStatus.USER_ALREADY_CLOCK_IN,
      );
    }

    //查询昨天签到情况
    const yesterdayClock = await this.clockRepository.findOne({
      order: {
        id: 'DESC',
      },
      where: {
        user_id: req.user.id,
        date: moment().subtract(1, 'd').format('YYYY-MM-DD'),
      },
    });

    //正常奖励20，连续7次奖励50，7次后清零
    let $integral = 20;
    if (yesterdayClock) {
      createClockDto.times = yesterdayClock.times + 1;
      if (yesterdayClock.times === 6) {
        $integral = 50;
      } else if (yesterdayClock.times === 7) {
        createClockDto.times = 1;
      }
    } else {
      createClockDto.times = 1;
    }
    createClockDto.date = moment().format('YYYY-MM-DD');
    createClockDto.user_id = req.user.id;

    this.addIntegral(req.user.id, $integral);
    this.addIntegralLog(req.user.id, $integral);

    return await this.clockRepository.save(createClockDto);
  }

  async findAllMonth(req) {
    return await this.clockRepository.find({
      where: {
        user_id: req.user.id,
        date: Between(
          moment().startOf('month').format('YYYY-MM-DD'),
          moment().endOf('month').format('YYYY-MM-DD'),
        ),
      },
    });
  }

  //增加积分
  async addIntegral(id: number, $integral: number) {
    const exitsUser = await this.userRepository.findOneBy({ id: id });
    if (!exitsUser) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    exitsUser.integral += $integral;
    this.userRepository.save(exitsUser);
  }

  //积分记录
  async addIntegralLog(id: number, $integral: number) {
    const integralLog = new UserIntegralLog();
    integralLog.user_id = id;
    integralLog.integral = $integral;
    integralLog.name = '签到积分奖励';
    integralLog.date = moment().format('YYYY-MM-DD');
    await this.userIntegralLogRepository.save(integralLog);
  }
}
