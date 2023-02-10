import { CACHE_MANAGER, HttpException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../tool/bcrypt/bcrypt.service';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';
import { PhoneLoginDto } from '../users/dto/phone-login.dto';
import { User } from '../users/entities/user.entity';
import { formatDate } from '../tool/date/date';
import { plainToClass } from 'class-transformer';
import { Cache } from 'cache-manager';
import { SmsService } from '../sms/sms.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly smsService: SmsService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findPasswordByName(username);
    if (
      user &&
      (await new BcryptService().compare(
        pass.toString(),
        user.password.toString(),
      ))
    ) {
      return user;
    }
    throw new HttpException(
      ResponseMessage.USER_ALREADY_OR_PASSWORD_ERROR,
      ResponseStatus.USER_ALREADY_OR_PASSWORD_ERROR,
    );
  }

  async login(user: any) {
    const userModel = await this.validateUser(user.username, user.password);
    const payload = { username: userModel.username, sub: userModel.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async phoneLogin(phoneLoginDto: PhoneLoginDto, ipAddress: string) {
    const key = await this.cacheManager.get(`${phoneLoginDto.phone} 'send_sms`);

    if (typeof key === 'string') {
      const code = JSON.parse(key);
      if (code !== phoneLoginDto.verification_code) {
        throw new HttpException(
          ResponseMessage.VERIFICATION_CODE_ERROR,
          ResponseStatus.VERIFICATION_CODE_ERROR,
        );
      }
      const userModel = await this.usersService.usersRepository.findOneBy({
        phone: phoneLoginDto.phone,
      });
      let user: User;
      if (!userModel) {
        phoneLoginDto.login_ip = ipAddress;
        phoneLoginDto.password = await this.smsService.randomString(6);
        phoneLoginDto.username = phoneLoginDto.phone;
        phoneLoginDto.login_time = new formatDate().getDate();
        phoneLoginDto.created_date = new formatDate().getDate();
        phoneLoginDto.created_at = new formatDate().getTime();
        phoneLoginDto.updated_at = new formatDate().getTime();
        const entity = plainToClass(User, phoneLoginDto);
        const userEntity = await this.usersService.usersRepository.save(entity);
        user = await this.usersService.findOne(userEntity.id);
      } else {
        user = userModel;
      }
      const payload = { username: user.username, sub: user.id };
      this.cacheManager.del(`${phoneLoginDto.phone} 'send_sms`);
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new HttpException(
      ResponseMessage.PLEASE_SEND_THE_VERIFICATION_CODE_FIRST,
      ResponseStatus.PLEASE_SEND_THE_VERIFICATION_CODE_FIRST,
    );
  }
}
