import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserTaskLog } from '../../task_log/entities/task_log.entity';

//用户任务
@Entity()
export class UserTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '任务标识' })
  @Index({ unique: true })
  identification: string;

  @Column({ comment: '任务名' })
  @Index({ unique: true })
  name: string;

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

  @OneToMany(() => UserTaskLog, (taskLog) => taskLog.userTask)
  taskLog: UserTaskLog[];
}
