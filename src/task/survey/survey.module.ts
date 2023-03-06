import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyQuestionModule } from './question/question.module';
import { SurveyOptionModule } from './option/option.module';
import { SurveyAnswerModule } from './answer/answer.module';
import { SurveyQuestion } from './question/entities/survey_question.entity';
import { SurveyOption } from './option/entities/survey_option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, SurveyQuestion, SurveyOption]),
    SurveyQuestionModule,
    SurveyOptionModule,
    SurveyAnswerModule,
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
