import { HttpException, Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import {
  ResponseMessage,
  ResponseStatus,
} from '../../code/response-status.enum';
import { SurveyQuestion } from './question/entities/survey_question.entity';
import { CreateQuestionDto } from './question/dto/create-question.dto';
import { CreateOptionDto } from './option/dto/create-option.dto';
import { SurveyOption } from './option/entities/survey_option.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyQuestion)
    private surveyQuestion: Repository<SurveyQuestion>,
    @InjectRepository(SurveyOption)
    private surveyOption: Repository<SurveyOption>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const survey = await this.surveyRepository.save(createSurveyDto);
    for (let i = 0; i < createSurveyDto.survey_questions.length; i++) {
      const Q = new CreateQuestionDto();
      Q.type = createSurveyDto.survey_questions[i].type;
      Q.name = createSurveyDto.survey_questions[i].name;
      Q.description = createSurveyDto.survey_questions[i].description;
      Q.sort = createSurveyDto.survey_questions[i].sort;
      Q.flag = createSurveyDto.survey_questions[i].flag;
      Q.pic_url = createSurveyDto.survey_questions[i].pic_url;
      Q.survey = survey;

      const surveyQuestion = await this.surveyQuestion.save(Q);
      for (
        let j = 0;
        j < createSurveyDto.survey_questions[i].survey_options.length;
        j++
      ) {
        const O = new CreateOptionDto();
        O.name = createSurveyDto.survey_questions[i].survey_options[j].name;
        O.sort = createSurveyDto.survey_questions[i].survey_options[j].sort;
        O.pic_url = createSurveyDto.survey_questions[i].survey_options[j].pic_url;
        O.survey_question = surveyQuestion;
        O.survey = survey;
        await this.surveyOption.save(O);
      }
    }

    return survey;
  }

  async findAll(query) {
    const qb = await this.surveyRepository.createQueryBuilder('surveys');
    qb.where('1 = 1');
    qb.orderBy('surveys.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const surveys = await qb.getMany();
    return { list: surveys, count: count };
  }

  async findOne(id: number) {
    return await this.surveyRepository
      .createQueryBuilder('surveys')
      .leftJoinAndSelect('surveys.survey_questions', 'survey_questions')
      .leftJoinAndSelect('survey_questions.survey_options', 'survey_options')
      .where('surveys.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto) {
    const exitsSurvey = await this.surveyRepository.findOneBy({ id: id });
    if (!exitsSurvey) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    const updateSurvey = this.surveyRepository.merge(
      exitsSurvey,
      updateSurveyDto,
    );

    return this.surveyRepository.save(updateSurvey);
  }

  async remove(id: number) {
    const exitsSurvey = await this.surveyRepository.findOneBy({ id: id });
    if (!exitsSurvey) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    return await this.surveyRepository.softRemove(exitsSurvey);
  }
}
