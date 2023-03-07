import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Controller('task/answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAnswerDto: CreateAnswerDto, @Request() req) {
    createAnswerDto.user = req.user;
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query) {
    return this.answerService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
