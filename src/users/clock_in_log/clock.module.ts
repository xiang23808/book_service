import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';
import { UserClockInLog } from './entities/clock_in_log.entity';
import { User } from '../entities/user.entity';
import { UserIntegralLog } from '../integral_log/entities/integral_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserClockInLog, User, UserIntegralLog])],
  controllers: [ClockController],
  providers: [ClockService],
})
export class UserClockInLogModule {}
