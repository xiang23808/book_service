import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ResponseMessage,
  ResponseStatus,
} from '../../../code/response-status.enum';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { SurveyAnswer } from './entities/survey_answer.entity';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(SurveyAnswer)
    private answersRepository: Repository<SurveyAnswer>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    return await this.answersRepository.save(createAnswerDto);
  }

  async findAll(query) {
    const qb = await this.answersRepository.createQueryBuilder(
      'survey_answers',
    );
    qb.where('1 = 1');
    qb.orderBy('survey_answers.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const questions = await qb.getMany();
    return { list: questions, count: count };
  }

  async findOne(id: number) {
    return await this.answersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const exitsAnswer = await this.answersRepository.findOneBy({ id: id });
    if (!exitsAnswer) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    const updateAnswer = this.answersRepository.merge(
      exitsAnswer,
      updateAnswerDto,
    );

    return this.answersRepository.save(updateAnswer);
  }

  async remove(id: number) {
    const exitsAnswer = await this.answersRepository.findOneBy({ id: id });
    if (!exitsAnswer) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    return await this.answersRepository.remove(exitsAnswer);
  }
}
