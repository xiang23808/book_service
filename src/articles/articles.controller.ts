import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('create')
  create(@Body() post) {
    return this.articlesService.create(post);
  }

  @Get(':id')
  findById(@Param('id') id) {
    return this.articlesService.findById(id);
  }

  @Get()
  findAll(@Query() query) {
    return this.articlesService.findAll(query);
  }

  @Put()
  update(@Body() body) {
    const { id, ...post } = body;
    return this.articlesService.updateById(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.articlesService.remove(id);
  }
}
