import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../../users/entities/user.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '类型:1-功能异常,2-体验问题,3-功能建议,0-其他',
  })
  type: number;

  @Column({ type: 'boolean', comment: '状态:1-正常:0:禁用', default: 1 })
  status: number;

  @ManyToOne(() => User, (user) => user.feedback)
  @JoinColumn({ name: 'user_id' })
  @Column({ type: 'tinyint' })
  user: User;

  @Column({ type: 'date', default: null })
  created_date: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;

  @Exclude()
  @Column({ type: 'timestamp' })
  deleted_at: string;
}
