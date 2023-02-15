import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelpsService } from './helps.service';

@Controller('information/helps')
export class HelpsController {
  constructor(private readonly helpsService: HelpsService) {}

  @Get()
  findAll(@Query() query) {
    return this.helpsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpsService.findOne(+id);
  }
}
