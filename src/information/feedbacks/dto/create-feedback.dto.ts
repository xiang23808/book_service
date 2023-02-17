import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { User } from '../../../users/entities/user.entity';

export class CreateFeedbackDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string;

  @ApiProperty({ description: '内容' })
  @IsNotEmpty({ message: '内容必填' })
  readonly content: string;

  @ApiPropertyOptional({ description: '类型' })
  @IsNotEmpty({ message: '类型必填' })
  readonly type: number;

  @ApiProperty({ description: '状态' })
  @IsNumber()
  readonly status: number;

  user: User;
}
