import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto extends User {
  @IsNotEmpty({ message: '参数不能为空!' })
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  login_ip: string;
  created_date: string;
  created_at: string;
  updated_at: string;
}
