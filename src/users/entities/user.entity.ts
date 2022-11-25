import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'tinyint', comment: '性别:1-男,2-女', default: 1 })
  sex: number;

  @Column({ comment: '头像', nullable: true })
  headimgurl: string;

  @Column({ comment: '介绍', nullable: true })
  introduce: string;

  @Column({ comment: '登录次数', default: 1 })
  login: string;

  @Column({ comment: '最后登录ip' })
  login_ip: string;

  @Column({
    type: 'date',
    comment: '最后登录日期',
    //default: new Date(),
  })
  login_time: string;

  @Column({ comment: '经验', default: 0 })
  exp: string;

  @Column({ comment: '积分', default: 0 })
  integral: number;

  @Column({ type: 'boolean', comment: '用户状态:1-正常:0:禁用', default: 1 })
  status: number;

  @Column({ type: 'date', default: null })
  created_date: string;

  @Column({ type: 'datetime', default: null })
  created_at: string;

  @Column({ type: 'datetime', default: null })
  updated_at: string;

  @Column({ type: 'datetime', nullable: true })
  deleted_at: string;
}
