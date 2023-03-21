import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskLogService } from './task_log.service';
import { CreateTaskLogDto } from './dto/create-task_log.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user/task_log')
export class TaskLogController {
  constructor(private readonly taskLogService: TaskLogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTaskLogDto: CreateTaskLogDto, @Request() req) {
    return this.taskLogService.create(createTaskLogDto, req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query, @Request() req) {
    return this.taskLogService.findAll(query, req);
  }
}
