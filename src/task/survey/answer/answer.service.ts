import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseMessage, ResponseStatus } from '../../../code/response-status.enum';
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
    const answers = [];
    createAnswerDto.answers.forEach(function (value: any) {
      answers.push({
        survey_id: createAnswerDto.survey_id,
        question_id: value.question_id,
        option_id: value.option_id,
        content: value.content,
        user_id: createAnswerDto.user.id,
      });
    });
    return await this.answersRepository
      .createQueryBuilder('answer')
      .insert()
      .values(answers)
      .execute();
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
    return await this.answersRepository.softRemove(exitsAnswer);
  }
}
