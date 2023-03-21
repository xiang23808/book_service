import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskLogDto } from './dto/create-task_log.dto';
import { UserTaskLog } from './entities/task_log.entity';

@Injectable()
export class TaskLogService {
  constructor(
    @InjectRepository(UserTaskLog)
    private taskLogRepository: Repository<UserTaskLog>,
  ) {}

  async create(createClockDto: CreateTaskLogDto, req) {
    createClockDto.user_id = req.user.id;
    return await this.taskLogRepository.save(createClockDto);
  }

  async findAll(query, req) {
    return await this.taskLogRepository.find({
      where: { user_id: req.user.id },
    });
  }
}
