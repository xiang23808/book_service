import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../tool/bcrypt/bcrypt.service';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
}
