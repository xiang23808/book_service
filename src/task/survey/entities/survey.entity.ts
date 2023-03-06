import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveyQuestion } from '../question/entities/survey_question.entity';
import { SurveyOption } from '../option/entities/survey_option.entity';
import { SurveyAnswer } from '../answer/entities/survey_answer.entity';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ default: '', comment: '主题' })
  name: string;

  @Column({ default: '', length: 1000, comment: '描述' })
  description: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '开始时间',
  })
  start_time: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '结束时间',
  })
  end_time: Date;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '1发布 2暂存 3已结束 4已失效',
  })
  status: number;

  @Column({
    type: 'smallint',
    default: 1,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '0置顶 1不置顶',
  })
  top_flag: number;

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

  @Column({
    type: 'int',
    default: 1,
    comment: '创建人员ID',
  })
  creator_id: number;

  @Column({
    type: 'int',
    default: 1,
    comment: '更新人员ID',
  })
  updator_id: number;

  @Column({
    default: '',
    comment: '图片地址',
  })
  pic_url: string;

  @OneToMany(
    () => SurveyQuestion,
    (survey_questions) => survey_questions.survey,
  )
  survey_questions: SurveyQuestion[];

  @OneToMany(() => SurveyOption, (survey_options) => survey_options.survey)
  survey_options: SurveyOption[];

  @OneToMany(() => SurveyAnswer, (survey_answers) => survey_answers.survey)
  survey_answers: SurveyQuestion[];
}
