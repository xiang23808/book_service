import { HttpException, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyOption } from './entities/survey_option.entity';
import {
  ResponseMessage,
  ResponseStatus,
} from '../../../code/response-status.enum';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(SurveyOption)
    private optionsRepository: Repository<SurveyOption>,
  ) {}

  async create(createOptionDto: CreateOptionDto) {
    return await this.optionsRepository.save(createOptionDto);
  }

  async findAll(query) {
    const qb = await this.optionsRepository.createQueryBuilder(
      'survey_options',
    );
    qb.where('1 = 1');
    qb.orderBy('survey_options.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const questions = await qb.getMany();
    return { list: questions, count: count };
  }

  async findOne(id: number) {
    return await this.optionsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOptionDto: UpdateOptionDto) {
    const exitsOption = await this.optionsRepository.findOneBy({ id: id });
    if (!exitsOption) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    const updateOption = this.optionsRepository.merge(
      exitsOption,
      updateOptionDto,
    );

    return this.optionsRepository.save(updateOption);
  }

  async remove(id: number) {
    const exitsOption = await this.optionsRepository.findOneBy({ id: id });
    if (!exitsOption) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    return await this.optionsRepository.remove(exitsOption);
  }
}
