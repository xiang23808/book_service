import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { HelpsService } from './helps.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('information/helps')
export class HelpsController {
  constructor(private readonly helpsService: HelpsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query) {
    return this.helpsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.helpsService.findOne(+id);
  }
}
