import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Controller('task/option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query) {
    return this.optionService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(+id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.optionService.remove(+id);
  }
}
