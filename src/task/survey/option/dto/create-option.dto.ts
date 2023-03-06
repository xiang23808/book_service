import { IsOptional } from 'class-validator';
import { SurveyQuestion } from '../../question/entities/survey_question.entity';
import { Survey } from '../../entities/survey.entity';

export class CreateOptionDto {
  @IsOptional()
  survey_question: SurveyQuestion;

  @IsOptional()
  survey: Survey;

  name: string;
  sort: number;
  pic_url: string;
}
