import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Date } from '../../../entities/user.entity';

//积分记录表
@Entity()
export class UserIntegralLog  extends Date {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '用户ID',
  })
  user_id: number;

  @Column({ comment: '奖励积分', default: 0 })
  integral: number;

  @Column({ comment: '奖励名' })
  name: string;

  @Column({
    type: 'int',
    default: 0,
    comment: '任务ID',
  })
  task_id: number;

  @Column({ type: 'date', default: null })
  date: string;
}
