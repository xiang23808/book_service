import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyAnswer } from './entities/survey_answer.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyAnswer])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class SurveyAnswerModule {}
