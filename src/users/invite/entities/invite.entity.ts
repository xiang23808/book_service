import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//邀请表
@Entity()
export class UserInvite {
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
}
