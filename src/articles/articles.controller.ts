import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('create')
  create(@Body() post: CreateArticleDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() post: UpdateArticleDto) {
    return this.articlesService.updateById(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.articlesService.remove(id);
  }
}
