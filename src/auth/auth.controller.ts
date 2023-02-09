import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PhoneLoginDto } from '../users/dto/phone-login.dto';
import { IpAddress } from '../tool/ip/ip';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Post('phone_login')
  phoneLogin(
    @Body() phoneLoginDto: PhoneLoginDto,
    @IpAddress() ipAddress: string,
  ) {
    return this.authService.phoneLogin(phoneLoginDto, ipAddress);
  }
}
