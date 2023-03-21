import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';
import { UserClockInLog } from './entities/clock_in_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserClockInLog])],
  controllers: [ClockController],
  providers: [ClockService],
})
export class UserClockInLogModule {}
