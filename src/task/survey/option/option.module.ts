import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyOption } from './entities/survey_option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyOption])],
  controllers: [OptionController],
  providers: [OptionService],
})
export class SurveyOptionModule {}
