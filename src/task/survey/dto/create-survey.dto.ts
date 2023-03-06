import { SurveyQuestion } from '../question/entities/survey_question.entity';
import { IsOptional } from 'class-validator';

export class CreateSurveyDto {
  @IsOptional()
  survey_questions: SurveyQuestion[];
}
