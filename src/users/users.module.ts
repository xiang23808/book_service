import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InfoModule } from './info/info.module';
import { BalanceLog } from './user_balance_log/entities/balance_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BalanceLog]), InfoModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
