import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IpAddress } from '../tool/ip/ip';
import { formatDate } from '../tool/date/date';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from '../tool/bcrypt/bcrypt.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
    @IpAddress() ipAddress: string,
  ) {
    createUserDto.login_ip = ipAddress;
    createUserDto.login_time = new formatDate().getDate();
    createUserDto.created_date = new formatDate().getDate();
    createUserDto.created_at = new formatDate().getTime();
    createUserDto.updated_at = new formatDate().getTime();
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async findInfo(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
