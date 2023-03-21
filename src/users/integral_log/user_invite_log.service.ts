import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInviteLogDto } from './dto/create-user_invite_log.dto';
import { UserIntegralLog } from './entities/integral_log.entity';

@Injectable()
export class UserInviteLogService {
  constructor(
    @InjectRepository(UserIntegralLog)
    private userInviteLogRepository: Repository<UserIntegralLog>,
  ) {}

  async create(createInviteLogDto: CreateUserInviteLogDto) {
    return await this.userInviteLogRepository.save(createInviteLogDto);
  }

  async findAll(query, req) {
    return await this.userInviteLogRepository.find();
  }
}
