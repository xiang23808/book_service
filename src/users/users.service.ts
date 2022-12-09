import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    if (this.findOne(createUserDto.id)) {
      throw new HttpException(
        ResponseMessage.USER_ALREADY_EXISTS,
        ResponseStatus.USER_ALREADY_EXISTS,
      );
    }
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: any): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByName(username: any): Promise<User> {
    return this.usersRepository.findOneBy({ username: username });
  }

  findPasswordByName(username: any): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .select('user.id')
      .addSelect('user.password')
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
