import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInviteDto } from './dto/create-user_invite.dto';
import { UserInvite } from './entities/invite.entity';

@Injectable()
export class UserInviteService {
  constructor(
    @InjectRepository(UserInvite)
    private userInviteRepository: Repository<UserInvite>,
  ) {}

  async create(createUserTaskDto: CreateUserInviteDto) {
    return await this.userInviteRepository.save(createUserTaskDto);
  }

  async findAll(query, req) {
    return await this.userInviteRepository.find();
  }
}
