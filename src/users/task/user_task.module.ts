import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTaskController } from './user_task.controller';
import { UserTaskService } from './user_task.service';
import { UserTask } from './entities/task.entity';
import { UserTaskLog } from '../task_log/entities/task_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTask, UserTaskLog])],
  controllers: [UserTaskController],
  providers: [UserTaskService],
})
export class UserTaskModule {}
