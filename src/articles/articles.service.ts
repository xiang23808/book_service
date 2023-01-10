import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';
import { Cache } from 'cache-manager';

export interface ArticlesRo {
  list: Article[];
  count: number;
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(post: Partial<Article>): Promise<Article> {
    const { title } = post;
    if (!title) {
      throw new HttpException(
        ResponseMessage.MISSING_ARTICLE_TITLE,
        ResponseStatus.MISSING_ARTICLE_TITLE,
      );
    }
    const doc = await this.articlesRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException(
        ResponseMessage.ARTICLE_ALREADY_EXISTS,
        ResponseStatus.ARTICLE_ALREADY_EXISTS,
      );
    }
    console.log(post);
    return await this.articlesRepository.save(post);
  }

  async findAll(query): Promise<ArticlesRo> {
    const qb = await this.articlesRepository.createQueryBuilder('articles');
    qb.where('1 = 1');
    qb.orderBy('articles.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const articles = await qb.getMany();
    return { list: articles, count: count };
  }

  async findById(id): Promise<Article> {
    const article = await this.articlesRepository.findOne({ where: { id } });
    this.cacheManager.set(`${id} 'article`, JSON.stringify(article), 1800);
    return article;
  }

  async updateById(id, post): Promise<Article> {
    const exitsArticle = await this.articlesRepository.findOneBy({ id: id });
    if (!exitsArticle) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    const updateArticle = this.articlesRepository.merge(exitsArticle, post);

    return this.articlesRepository.save(updateArticle);
  }

  async remove(id) {
    const exitsArticle = await this.articlesRepository.findOneBy({ id: id });
    if (!exitsArticle) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    return await this.articlesRepository.remove(exitsArticle);
  }
}
