import { Injectable } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class AmqpService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  //消息队列
  @RabbitSubscribe({
    exchange: 'rpc-queue',
    routingKey: 'rpc-route',
    queue: 'rpc-queue',
  })
  message(message, amqpMsg: ConsumeMessage) {
    console.log('接受消息');
    console.log(message);
    //console.log(amqpMsg);
    console.log('消息处理完毕');
  }

  async publishMessage(message) {
    await this.amqpConnection.publish('amq.direct', 'messages', message);
  }

  onModuleDestroy() {
    console.log('RabbitMqService destroyed');
  }
  async onModuleInit() {
    console.log('RabbitMqService initialized');
  }
}
