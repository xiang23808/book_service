import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserTask } from '../../task/entities/task.entity';
import { Date } from '../../../entities/user.entity';

//任务记录表
@Entity()
export class UserTaskLog  extends Date {
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
    comment: '任务ID',
  })
  user_task_id: number;

  @Column({ comment: '奖励积分', default: 0 })
  integral: number;

  @Column({ type: 'date', default: null })
  date: string;

  @ManyToOne(() => User, (user) => user.userTaskLog)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UserTask, (userTask) => userTask.taskLog)
  @JoinColumn({ name: 'user_task_id' })
  userTask: UserTask;
}
