import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLogController } from './task_log.controller';
import { TaskLogService } from './task_log.service';
import { UserTaskLog } from './entities/task_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTaskLog])],
  controllers: [TaskLogController],
  providers: [TaskLogService],
})
export class UserTaskLogModule {}
