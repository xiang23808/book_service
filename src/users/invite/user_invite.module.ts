import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInviteController } from './user_invite.controller';
import { UserInviteService } from './user_invite.service';
import { UserInvite } from './entities/invite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInvite])],
  controllers: [UserInviteController],
  providers: [UserInviteService],
})
export class UserInviteModule {}
