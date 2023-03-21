import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserInviteService } from './user_invite.service';
import { CreateUserInviteDto } from './dto/create-user_invite.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user/user_invite')
export class UserInviteController {
  constructor(private readonly userInviteService: UserInviteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createInviteLogDto: CreateUserInviteDto) {
    return this.userInviteService.create(createInviteLogDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query, @Request() req) {
    return this.userInviteService.findAll(query, req);
  }
}
