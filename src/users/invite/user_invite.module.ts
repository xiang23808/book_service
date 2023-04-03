import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInviteController } from './user_invite.controller';
import { UserInviteService } from './user_invite.service';
import { UserInvite } from './entities/invite.entity';
import { User } from '../entities/user.entity';
import { UserIntegralLog } from '../integral_log/entities/integral_log.entity';
import { UserTask } from '../task/entities/task.entity';
import { UserTaskLog } from '../task_log/entities/task_log.entity';
import { ChatService } from '../../socket/chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInvite,
      User,
      UserIntegralLog,
      UserTask,
      UserTaskLog,
    ]),
  ],
  controllers: [UserInviteController],
  providers: [UserInviteService, ChatService],
})
export class UserInviteModule {}
