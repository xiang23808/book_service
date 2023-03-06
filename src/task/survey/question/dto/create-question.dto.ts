import { IsOptional } from 'class-validator';
import { Survey } from '../../entities/survey.entity';

export class CreateQuestionDto {
  @IsOptional()
  survey: Survey;

  type: number;
  name: string;
  description: string;
  sort: number;
  flag: number;
  pic_url: string;
}
