import {
  Column, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { SurveyQuestion } from '../../question/entities/survey_question.entity';
import { User } from '../../../../users/entities/user.entity';
import { Date } from '../../../../entities/user.entity';

@Entity('survey_answers')
export class SurveyAnswer extends Date {
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
    comment: '用户ID',
  })
  user_id: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '问题表ID',
  })
  question_id: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '选项表ID',
  })
  option_id: number;

  @Column({ default: '', comment: '答案内容' })
  content: string;

  @Column({
    default: '',
    comment: '图片地址',
  })
  pic_url: string;

  @ManyToOne(() => Survey, (survey) => survey.survey_answers, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @ManyToOne(
    () => SurveyQuestion,
    (survey_question) => survey_question.survey_answers,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({ name: 'question_id' })
  survey_question: SurveyQuestion;

  @ManyToOne(() => User, (user) => user.surveyAnswer, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
