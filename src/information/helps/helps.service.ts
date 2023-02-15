import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Help } from './entities/help.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HelpsService {
  constructor(
    @InjectRepository(Help) private helpsRepository: Repository<Help>,
  ) {}
  async findAll(query) {
    const qb = await this.helpsRepository.createQueryBuilder('help');
    qb.where('1=1');
    qb.orderBy('help.order', 'DESC');
    qb.addOrderBy('help.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const help = await qb.getMany();

    return { list: help, count: count };
  }

  async findOne(id: number) {
    return await this.helpsRepository.findOneBy({ id: id });
  }
}
