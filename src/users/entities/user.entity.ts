import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { InfoEntity } from '../info/entities/info.entity';
import { Article } from '../../articles/entities/article.entity';
import { BcryptService } from '../../tool/bcrypt/bcrypt.service';
import { Feedback } from '../../information/feedbacks/entities/feedback.entity';
import { SurveyAnswer } from '../../task/survey/answer/entities/survey_answer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column({ default: '' })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ select: false })
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

  @Exclude()
  @Column({ type: 'datetime', nullable: true })
  deleted_at: string;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await new BcryptService().hash(this.password.toString());
  }

  @OneToOne(() => InfoEntity, (info) => info.user)
  info: InfoEntity;

  @OneToMany(() => Article, (articles) => articles.user)
  articles: Article[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedback: Feedback[];

  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.user)
  surveyAnswer: SurveyAnswer[];
}
