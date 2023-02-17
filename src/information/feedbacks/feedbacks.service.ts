import { HttpException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import {
  ResponseMessage,
  ResponseStatus,
} from '../../code/response-status.enum';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbacksRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbacksRepository.save(createFeedbackDto);
  }

  async findAll(query) {
    const qb = await this.feedbacksRepository.createQueryBuilder('feedback');
    qb.where('1=1');
    qb.addOrderBy('feedback.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const feedback = await qb.getMany();

    return { list: feedback, count: count };
  }

  async findOne(id: number) {
    return await this.feedbacksRepository.findOneBy({ id: id });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new HttpException(
        ResponseMessage.FEEDBACK_DOES_NOT_EXIST,
        ResponseStatus.FEEDBACK_DOES_NOT_EXIST,
      );
    }
    const updateFeedback = this.feedbacksRepository.merge(
      feedback,
      updateFeedbackDto,
    );
    return this.feedbacksRepository.save(updateFeedback);
  }

  async remove(id: number) {
    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new HttpException(
        ResponseMessage.FEEDBACK_DOES_NOT_EXIST,
        ResponseStatus.FEEDBACK_DOES_NOT_EXIST,
      );
    }
    return this.feedbacksRepository.remove(feedback);
  }
}
