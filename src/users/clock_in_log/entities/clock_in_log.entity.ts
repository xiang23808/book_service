import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Date } from '../../../entities/user.entity';

@Entity()
export class UserClockInLog extends Date {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '用户ID',
  })
  user_id: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '连续几次',
  })
  times: number;

  @Column({ type: 'date', default: null })
  date: string;
}
