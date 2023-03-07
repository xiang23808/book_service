import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('information/feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createFeedbackDto: CreateFeedbackDto, @Request() req) {
    createFeedbackDto.user = req.user.id;
    return this.feedbacksService.create(createFeedbackDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query) {
    return this.feedbacksService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}
