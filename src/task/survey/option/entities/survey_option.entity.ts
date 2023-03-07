import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { SurveyQuestion } from '../../question/entities/survey_question.entity';

@Entity('survey_options')
export class SurveyOption {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({
    type: 'int',
    default: 0,
    comment: '调查问卷主表ID',
  })
  survey_id: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '问题表ID',
  })
  question_id: number;

  @Column({ default: '', comment: '选项名称' })
  name: string;

  @Column({
    type: 'smallint',
    default: 1,
    comment: '排序',
  })
  sort: number;

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

  @ManyToOne(() => Survey, (survey) => survey.survey_options)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @ManyToOne(
    () => SurveyQuestion,
    (survey_question) => survey_question.survey_options,
  )
  @JoinColumn({ name: 'question_id' })
  survey_question: SurveyQuestion;
}
