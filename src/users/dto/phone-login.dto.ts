import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class PhoneLoginDto extends User {
  @IsNotEmpty({ message: '参数不能为空!' })
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  verification_code: string;
}
