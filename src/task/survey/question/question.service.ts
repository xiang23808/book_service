import { HttpException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyQuestion } from './entities/survey_question.entity';
import {
  ResponseMessage,
  ResponseStatus,
} from '../../../code/response-status.enum';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(SurveyQuestion)
    private questionsRepository: Repository<SurveyQuestion>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.questionsRepository.save(createQuestionDto);
  }

  async findAll(query) {
    const qb = await this.questionsRepository.createQueryBuilder(
      'survey_questions',
    );
    qb.where('1 = 1');
    qb.orderBy('survey_questions.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const questions = await qb.getMany();
    return { list: questions, count: count };
  }

  async findOne(id: number) {
    return await this.questionsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const exitsQuestion = await this.questionsRepository.findOneBy({ id: id });
    if (!exitsQuestion) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    const updateQuestion = this.questionsRepository.merge(
      exitsQuestion,
      updateQuestionDto,
    );

    return this.questionsRepository.save(updateQuestion);
  }

  async remove(id: number) {
    const exitsQuestion = await this.questionsRepository.findOneBy({ id: id });
    if (!exitsQuestion) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    return await this.questionsRepository.remove(exitsQuestion);
  }
}
