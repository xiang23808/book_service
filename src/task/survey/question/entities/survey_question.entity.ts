import {
  Column, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { SurveyOption } from '../../option/entities/survey_option.entity';
import { SurveyAnswer } from '../../answer/entities/survey_answer.entity';

@Entity('survey_questions')
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({
    type: 'int',
    default: 0,
    comment: '调查问卷主表ID',
  })
  survey_id: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '1单选 2多选 3填空',
  })
  type: number;

  @Column({ default: '', comment: '问题主题' })
  name: string;

  @Column({ default: '', length: 1000, comment: '描述' })
  description: string;

  @Column({
    type: 'smallint',
    default: 1,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '0必填 1非必填',
  })
  flag: number;

  @Column({
    default: '',
    comment: '图片地址',
  })
  pic_url: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
    comment: '删除时间',
  })
  deleted_at: string;

  @ManyToOne(() => Survey, (survey) => survey.survey_questions)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @OneToMany(
    () => SurveyOption,
    (survey_options) => survey_options.survey_question,
  )
  survey_options: SurveyOption[];

  @OneToMany(
    () => SurveyAnswer,
    (survey_answers) => survey_answers.survey_question,
  )
  survey_answers: SurveyAnswer[];
}
