import { IsNotEmpty } from 'class-validator';

export class CreateUserInviteDto {
  invite_user_id: number;

  @IsNotEmpty({ message: '参数不能为空!' })
  user_id: number;
  date: string;
}
