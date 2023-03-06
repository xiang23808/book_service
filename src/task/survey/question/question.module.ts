import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestion } from './entities/survey_question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestion])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class SurveyQuestionModule {}
