import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTaskLog } from '../../task_log/entities/task_log.entity';
import { Date } from '../../../entities/user.entity';

//用户任务
@Entity()
export class UserTask extends Date {
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

  @OneToMany(() => UserTaskLog, (taskLog) => taskLog.userTask)
  taskLog: UserTaskLog[];
}
