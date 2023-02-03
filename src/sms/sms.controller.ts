import { Body, CACHE_MANAGER, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { SendSmsDto } from './dto/send-sms.dto';
import { SmsService } from './sms.service';
import { ResponseMessage, ResponseStatus } from '../code/response-status.enum';
import { Cache } from 'cache-manager';

@Controller('sms')
export class SmsController {
  constructor(
    private readonly smsService: SmsService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Post('send_sms')
  async sendSms(@Body() sendSmsDto: SendSmsDto) {
    const key = await this.cacheManager.get(`${sendSmsDto.phone} 'send_sms`);
    if (typeof key === 'string') {
      throw new HttpException(
        ResponseMessage.SMS_SEND_WAIT,
        ResponseStatus.SMS_SEND_WAIT,
      );
    }

    const code = await this.smsService.randomString(6);
    const res = await this.smsService.sendSms(sendSmsDto.phone, code);

    if (JSON.parse(res).code === 'OK') {
      this.cacheManager.set(
        `${sendSmsDto.phone} 'send_sms`,
        JSON.stringify(code),
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
