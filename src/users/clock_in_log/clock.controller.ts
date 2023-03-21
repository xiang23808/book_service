import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClockService } from './clock.service';
import { CreateClockDto } from './dto/create-clock.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users/clock_in')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createClockDto: CreateClockDto, @Request() req) {
    return this.clockService.create(createClockDto, req);
  }

  @Get('find_all_month')
  @UseGuards(JwtAuthGuard)
  findAllMonth(@Request() req) {
    return this.clockService.findAllMonth(req);
  }
}
