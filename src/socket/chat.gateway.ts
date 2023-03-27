import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { WsServiceResponseInterceptor } from '../interceptor/ws-service.response.interceptor';
import { WsServiceExceptionFilter } from '../filters/logger/ws.filter';

@UseInterceptors(new WsServiceResponseInterceptor())
@UseFilters(new WsServiceExceptionFilter())
@WebSocketGateway(3001, {
  transports: ['websocket'],
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  async listenForMessages(@MessageBody() data: string) {
    this.server.sockets.emit('receive_message', data);
    await new Promise((r) => setTimeout(r, 2000));
    return 'receive_message';
  }
}
