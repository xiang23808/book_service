import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInviteLogController } from './user_invite_log.controller';
import { UserInviteLogService } from './user_invite_log.service';
import { UserIntegralLog } from './entities/integral_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserIntegralLog])],
  controllers: [UserInviteLogController],
  providers: [UserInviteLogService],
})
export class UserInviteLogModule {}
