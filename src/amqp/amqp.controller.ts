import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('amqp')
export class AmqpController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('send_amqp')
  @MessagePattern('notifications')
  async sendAmqp(@Request() res) {
    const record = 'hello';
    //console.log(context.getChannelRef());
    // send中第一个参数对应的是接收方法的监听字段，也可以放对象，但接收的时候也必须是相同的对象，第二个参数对应的是发送的内容，如果需要在headers中增加内容的话可以参考官方文档
    const result = this.client.send('test', record).subscribe();
    console.log('result', res.body);
    return '消息发送成功';
  }

  @MessagePattern('test')
  test(@Payload() data: string) {
    console.log('get message', data);
  }
}
