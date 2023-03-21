import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserTaskService } from './user_task.service';
import { CreateUserTaskDto } from './dto/create-user_task.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user/user_task')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTaskLogDto: CreateUserTaskDto) {
    return this.userTaskService.create(createTaskLogDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query, @Request() req) {
    return this.userTaskService.findAll(query, req);
  }
}
