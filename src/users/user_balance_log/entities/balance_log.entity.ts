import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Date } from '../../../entities/user.entity';

@Entity('user_balance_log')
export class BalanceLog extends Date {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '用户ID',
  })
  user_id: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '0-增加，1-减少',
  })
  type: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '0-积分兑换',
  })
  change_type: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '增加金额',
  })
  add_balance: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '金额',
  })
  balance: number;

  @Column({ type: 'date', default: null })
  date: string;
}
