import {
  Body,
  CACHE_MANAGER,
  Controller,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common';
import { SendSmsDto } from './dto/send-sms.dto';
import { SmsService } from './sms.service';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Controller('sms')
export class SmsController {
  constructor(
    private readonly smsService: SmsService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('send_sms')
  async sendSms(@Body() sendSmsDto: SendSmsDto) {
    const code = await this.smsService.randomString(6);
    if (process.env.NODE_ENV === 'development') {
      this.redis.set(
        `${sendSmsDto.phone} 'send_sms`,
        JSON.stringify(code),
        'EX',
        300,
      );
      return code;
    }
    const key = await this.redis.get(`${sendSmsDto.phone} 'send_sms`);
    if (typeof key === 'string') {
      throw new HttpException(
        ResponseMessage.SMS_SEND_WAIT,
        ResponseStatus.SMS_SEND_WAIT,
      );
    }

    const res = await this.smsService.sendSms(sendSmsDto.phone, code);

    if (JSON.parse(res).code === 'OK') {
      this.redis.set(
        `${sendSmsDto.phone} 'send_sms`,
        JSON.stringify(code),
        'EX',
        300,
      );
      return '发送成功';
    }
    throw new HttpException(
      ResponseMessage.SMS_SEND_FAIL,
      ResponseStatus.SMS_SEND_FAIL,
    );
  }
}
