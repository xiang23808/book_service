import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserTaskDto } from './dto/create-user_task.dto';
import { UserTask } from './entities/task.entity';
import { UserTaskLog } from '../task_log/entities/task_log.entity';
import * as moment from 'moment';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private userTaskRepository: Repository<UserTask>,
    @InjectRepository(UserTaskLog)
    private taskLogRepository: Repository<UserTaskLog>,
    private dataSource: DataSource,
  ) {}

  async create(createUserTaskDto: CreateUserTaskDto) {
    return await this.userTaskRepository.save(createUserTaskDto);
  }

  async findAll(query, req) {
    const tasks = await this.userTaskRepository.find();
    const taskLogRepository = this.taskLogRepository;
    const taskObj = JSON.parse(JSON.stringify(tasks));
    const resTask = [];
    for (const task of taskObj) {
      task.status = await taskLogRepository.countBy({
        user_id: req.user.id,
        user_task_id: task.id,
        date: moment().format('YYYY-MM-DD'),
      });
      resTask.push(task);
    }
    return resTask;
  }
}
