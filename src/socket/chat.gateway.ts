import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { WsServiceResponseInterceptor } from '../interceptor/ws-service.response.interceptor';
import { WsServiceExceptionFilter } from '../filters/logger/ws.filter';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endWs, helloWs, resWs } from './wseventdata';

@UseInterceptors(new WsServiceResponseInterceptor())
@UseFilters(new WsServiceExceptionFilter())
@WebSocketGateway(3001, {
  transports: ['websocket'],
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log('有人链接了' + socket.id);
    this.server.sockets.emit('hello', helloWs);
  }
  handleDisconnect(socket: Socket) {
    console.log('有人断开了' + socket.id);
  }

  @SubscribeMessage('send_message')
  listenForMessages(
    @MessageBody() data: string,
  ): Observable<WsResponse<number>> {
    this.server.sockets.emit('receive_message', data);
    console.log('发送消息了');
    //await new Promise((r) => setTimeout(r, 2000));
    const event = 'events';
    const response = [1, 2, 3];
    return from(response).pipe(map((data) => ({ event, data })));
  }

  @SubscribeMessage('response')
  handleResponse(socket: Socket, data: any): string {
    console.log(`response received:${data}}`);
    resWs.data = data;
    console.log(resWs);
    console.log(socket.id + '发送消息了');
    socket.emit('response', resWs);
    return 'OK';
  }

  @SubscribeMessage('terminate')
  handleTerminate(socket: Socket, data: any): string {
    console.log(`received:${data.data}}`);
    socket.emit('end', endWs);
    return 'OK';
  }

  @SubscribeMessage('events')
  handleMessage(socket: Socket, data: any): string {
    console.log(data.data);
    // return JSON.stringify(payload);
    return 'OK';
  }

  @SubscribeMessage('identity')
  handleMessageidentity(socket: Socket, data: string): string {
    console.log(data);
    return 'Hello world!';
  }
}
