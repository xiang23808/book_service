import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class SetPasswordDto extends User {
  @IsNotEmpty({ message: '参数不能为空!' })
  @IsMobilePhone('zh-CN')
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  verification_code: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
