import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserTask } from '../../task/entities/task.entity';

//任务记录表
@Entity()
export class UserTaskLog {
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

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    comment: '创建时间',
  })
  created_at: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    comment: '更新时间',
  })
  updated_at: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
    comment: '删除时间',
  })
  deleted_at: string;

  @ManyToOne(() => User, (user) => user.userTaskLog)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UserTask, (userTask) => userTask.taskLog)
  @JoinColumn({ name: 'user_task_id' })
  userTask: UserTask;
}
