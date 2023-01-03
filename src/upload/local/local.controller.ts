import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LocalService } from './local.service';
import { UpdateLocalDto } from './dto/update-local.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('upload')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @ApiOperation({ summary: '上传文件到本地' })
  @ApiConsumes('multipart/form-data')
  @Post('local')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return `${process.env.APP_URL}.${file.path}`;
  }

  @Get()
  findAll() {
    return this.localService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return this.localService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localService.remove(+id);
  }
}
