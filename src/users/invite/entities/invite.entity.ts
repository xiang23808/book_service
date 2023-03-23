import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Date } from '../../../entities/user.entity';

//邀请表
@Entity()
export class UserInvite  extends Date {
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
    comment: '被邀请用户ID',
  })
  invite_user_id: number;

  @Column({ type: 'date', default: null })
  date: string;
}
