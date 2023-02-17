import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';
import { IsNumber } from 'class-validator';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @ApiProperty({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '类型' })
  @IsNumber()
  readonly type: number;

  @ApiProperty({ description: '状态' })
  @IsNumber()
  readonly status: number;
}
