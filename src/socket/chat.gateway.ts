import {
  ConnectedSocket,
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
import { ChatService } from './chat.service';
import { Logger } from '../tool/log/log4js';

@UseInterceptors(new WsServiceResponseInterceptor())
@UseFilters(new WsServiceExceptionFilter())
@WebSocketGateway(3001, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    let user;
    try {
      user = await this.chatService.getUserFromSocket(socket);
    } catch (exception: any) {
      return socket.client._disconnect();
    }
    this.chatService.add(String(user.sub), socket);
    console.log('有人连接了' + socket.id);
    Logger.info('有人连接了：' + socket.id);
  }

  async handleDisconnect(socket: Socket) {
    let user;
    try {
      user = await this.chatService.getUserFromSocket(socket);
    } catch (exception: any) {
      return socket.client._disconnect();
    }
    this.chatService.remove(String(user.sub), socket);
    console.log('有人断开了' + socket.id);
    Logger.info('有人断开了：' + socket.id);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): Promise<Observable<WsResponse<number>>> {
    client.emit('receive_message', data);
    console.log('发送消息了');

    //await new Promise((r) => setTimeout(r, 2000));
    console.log(client);
    // const io = new Server();

    const io = new Server();
    const re = io.to('room42').emit('hello', "to all clients in 'room42' room");
    console.log(re);
    const event = 'events';
    const response = [1, 2, 3];
    return from(response).pipe(map((data) => ({ event, data })));
  }
}
