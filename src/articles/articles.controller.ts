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
import { Article } from './entities/article.entity';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('create')
  create(@Body() post: CreateArticleDto) {
    return this.articlesService.create(post);
  }

  @Get(':id')
  async findById(@Param('id') id) {
    const key = await this.redis.get(`${id} 'article`);
    let article: Article | string;
    if (typeof key === 'string') {
      article = JSON.parse(key);
    } else {
      article = await this.articlesService.findById(id);
    }
    return article;
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
