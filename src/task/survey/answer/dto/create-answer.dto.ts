import { User } from '../../../../users/entities/user.entity';

export class CreateAnswerDto {
  answers: [];
  user: User;

  survey_id: number;
}
