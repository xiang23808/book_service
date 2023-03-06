import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { SurveyQuestion } from '../../question/entities/survey_question.entity';
import { SurveyOption } from '../../option/entities/survey_option.entity';
import { User } from '../../../../users/entities/user.entity';

@Entity('survey_answers')
export class SurveyAnswer {
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

  @ManyToOne(() => Survey, (survey) => survey.survey_answers)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @ManyToOne(
    () => SurveyQuestion,
    (survey_question) => survey_question.survey_answers,
  )
  @JoinColumn({ name: 'question_id' })
  survey_question: SurveyQuestion;

  @OneToOne(() => SurveyOption, (survey_option) => survey_option.survey_answer)
  @JoinColumn({ name: 'option_id' })
  survey_option: SurveyOption;

  @ManyToOne(() => User, (user) => user.surveyAnswer)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
