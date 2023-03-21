import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import { CreateClockDto } from './dto/create-clock.dto';
import { UserClockInLog } from './entities/clock_in_log.entity';
import * as moment from 'moment';
import { ResponseMessage, ResponseStatus } from '../../code/response-status.enum';

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(UserClockInLog)
    private clockRepository: Repository<UserClockInLog>,
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

    if (yesterdayClock) {
      createClockDto.times = yesterdayClock.times + 1;
      if (yesterdayClock.times === 7) {
        createClockDto.times = 1;
      }
    } else {
      createClockDto.times = 1;
    }
    createClockDto.date = moment().format('YYYY-MM-DD');
    createClockDto.user_id = req.user.id;

    //todo 发放积分User，添加积分记录：UserIntegralLog
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
}
