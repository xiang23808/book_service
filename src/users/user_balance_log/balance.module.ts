import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceService } from './balance.service';
import { BalanceLog } from './entities/balance_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceLog])],
  providers: [BalanceService],
})
export class BalanceLogModule {}
