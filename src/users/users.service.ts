import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';
import { plainToClass } from 'class-transformer';
import { SetPasswordDto } from './dto/set-password.dto';
import { BcryptService } from '../tool/bcrypt/bcrypt.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ExchangeBalanceDto } from './dto/exchange-balance.dto';
import { BalanceLog } from './user_balance_log/entities/balance_log.entity';
import { CreateBalanceDto } from './user_balance_log/dto/create-balance.dto';
import * as moment from 'moment/moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>,
    @InjectRepository(BalanceLog)
    public balanceLogRepository: Repository<BalanceLog>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findOneByName(createUserDto.username)) {
      throw new HttpException(
        ResponseMessage.USER_ALREADY_EXISTS,
        ResponseStatus.USER_ALREADY_EXISTS,
      );
    }
    //调用实体监听器
    const entity = plainToClass(User, createUserDto);
    const user = await this.usersRepository.save(entity);
    return this.findOne(user.id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['info', 'articles'] });
  }

  findOne(id: any): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: ['info', 'articles'],
    });
  }

  findOneByName(username: any): Promise<User> {
    return this.usersRepository.findOne({
      where: { username: username },
      relations: ['info', 'articles'],
    });
  }

  findPasswordByName(username: any): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .select('user.id')
      .addSelect('user.password')
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const exitsUser = await this.usersRepository.findOneBy({ id: id });
    if (!exitsUser) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    const updateUser = this.usersRepository.merge(exitsUser, updateUserDto);

    return this.usersRepository.save(updateUser);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }

  async setPassword(setPasswordDto: SetPasswordDto) {
    const key = await this.redis.get(`${setPasswordDto.phone} 'send_sms`);
    if (typeof key === 'string') {
      const code = JSON.parse(key);
      if (code !== setPasswordDto.verification_code) {
        throw new HttpException(
          ResponseMessage.VERIFICATION_CODE_ERROR,
          ResponseStatus.VERIFICATION_CODE_ERROR,
        );
      }
      const userModel = await this.usersRepository.findOneBy([
        { phone: setPasswordDto.phone },
        { username: setPasswordDto.phone },
      ]);
      if (!userModel) {
        throw new HttpException(
          ResponseMessage.ARTICLE_DOES_NOT_EXIST,
          ResponseStatus.ARTICLE_DOES_NOT_EXIST,
        );
      }
      userModel.password = await new BcryptService().hash(
        setPasswordDto.password.toString(),
      );
      await this.usersRepository.save(userModel);
      this.redis.del(`${setPasswordDto.phone} 'send_sms`);
      return true;
    }
    throw new HttpException(
      ResponseMessage.PLEASE_SEND_THE_VERIFICATION_CODE_FIRST,
      ResponseStatus.PLEASE_SEND_THE_VERIFICATION_CODE_FIRST,
    );
  }

  async addIntegral(id: number, $integral) {
    const exitsUser = await this.usersRepository.findOneBy({ id: id });
    if (!exitsUser) {
      throw new HttpException(
        ResponseMessage.ARTICLE_DOES_NOT_EXIST,
        ResponseStatus.ARTICLE_DOES_NOT_EXIST,
      );
    }
    exitsUser.integral += $integral;

    return this.usersRepository.save(exitsUser);
  }

  async exchangeBalance(exchangeBalanceDto: ExchangeBalanceDto, req) {
    if (exchangeBalanceDto.integral % 100 != 0) {
      throw new HttpException(
        ResponseMessage.INTEGRAL_NUMBER_ERROR,
        ResponseStatus.INTEGRAL_NUMBER_ERROR,
      );
    }
    if (exchangeBalanceDto.integral > req.user.integral) {
      throw new HttpException(
        ResponseMessage.INSUFFICIENT_INTEGRAL,
        ResponseStatus.INSUFFICIENT_INTEGRAL,
      );
    }

    const createBalanceDto = new CreateBalanceDto();
    req.user.balance += exchangeBalanceDto.integral / 100;
    req.user.integral -= exchangeBalanceDto.integral;

    createBalanceDto.user_id = req.user.id;
    createBalanceDto.add_balance = exchangeBalanceDto.integral / 100;
    createBalanceDto.balance = req.user.balance;
    createBalanceDto.date = moment().format('YYYY-MM-DD');

    this.balanceLogRepository.save(createBalanceDto);
    return this.usersRepository.save(req.user);
  }
}
