import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';
import { plainToClass } from 'class-transformer';
import { SetPasswordDto } from './dto/set-password.dto';
import { Cache } from 'cache-manager';
import { BcryptService } from '../tool/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
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
    const key = await this.cacheManager.get(
      `${setPasswordDto.phone} 'send_sms`,
    );
    if (typeof key === 'string') {
      const code = JSON.parse(key);
      if (code !== setPasswordDto.verification_code) {
        throw new HttpException(
          ResponseMessage.VERIFICATION_CODE_ERROR,
          ResponseStatus.VERIFICATION_CODE_ERROR,
        );
      }
      const userModel = await this.usersRepository.findOneBy({
        phone: setPasswordDto.phone,
      });
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
      this.cacheManager.del(`${setPasswordDto.phone} 'send_sms`);
      return true;
    }
    throw new HttpException(
      ResponseMessage.PLEASE_SEND_THE_VERIFICATION_CODE_FIRST,
      ResponseStatus.PLEASE_SEND_THE_VERIFICATION_CODE_FIRST,
    );
  }
}
