import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserTaskDto } from './dto/create-user_task.dto';
import { UserTask } from './entities/task.entity';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private userTaskRepository: Repository<UserTask>,
  ) {}

  async create(createUserTaskDto: CreateUserTaskDto) {
    return await this.userTaskRepository.save(createUserTaskDto);
  }

  async findAll(query, req) {
    return await this.userTaskRepository.find();
  }
}
