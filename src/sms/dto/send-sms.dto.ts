import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendSmsDto {
  @IsNotEmpty({ message: '参数不能为空!' })
  @ApiProperty()
  phone: string;
}
