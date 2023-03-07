import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query, UseGuards,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('task/survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query) {
    return this.surveyService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(+id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.surveyService.remove(+id);
  }
}
