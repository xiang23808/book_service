import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserInviteLogService } from './user_invite_log.service';
import { CreateUserInviteLogDto } from './dto/create-user_invite_log.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user/user_invite_log')
export class UserInviteLogController {
  constructor(private readonly userInviteLogService: UserInviteLogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createInviteLogDto: CreateUserInviteLogDto) {
    return this.userInviteLogService.create(createInviteLogDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query, @Request() req) {
    return this.userInviteLogService.findAll(query, req);
  }
}
