import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SurveyQuestion } from '../question/entities/survey_question.entity';
import { SurveyOption } from '../option/entities/survey_option.entity';
import { SurveyAnswer } from '../answer/entities/survey_answer.entity';
import { Date } from '../../../entities/user.entity';

@Entity('surveys')
export class Survey extends Date {
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
    {
      createForeignKeyConstraints: false,
    },
  )
  survey_questions: SurveyQuestion[];

  @OneToMany(() => SurveyOption, (survey_options) => survey_options.survey, {
    createForeignKeyConstraints: false,
  })
  survey_options: SurveyOption[];

  @OneToMany(() => SurveyAnswer, (survey_answers) => survey_answers.survey, {
    createForeignKeyConstraints: false,
  })
  survey_answers: SurveyQuestion[];
}
