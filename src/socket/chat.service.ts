import { Injectable, UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io/dist/socket';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class ChatService {
  private socketState = new Map<string, Socket[]>();

  public add(userId: string, socket: Socket): boolean {
    const existingSockets = this.socketState.get(userId) || [];

    const sockets = [...existingSockets, socket];

    this.socketState.set(userId, sockets);

    return true;
  }

  public remove(userId: string, socket: Socket): boolean {
    const existingSockets = this.socketState.get(userId);

    if (!existingSockets) {
      return true;
    }

    const sockets = existingSockets.filter((s) => s.id !== socket.id);

    if (!sockets.length) {
      this.socketState.delete(userId);
    } else {
      this.socketState.set(userId, sockets);
    }

    return true;
  }

  public get(userId: string): Socket[] {
    return this.socketState.get(userId) || [];
  }

  public getAll(): Socket[] {
    const all = [];

    this.socketState.forEach((sockets) => all.push(sockets));

    return all;
  }

  async getUserFromSocket(socket: Socket): Promise<any> {
    const auth = socket.handshake.headers.authorization;
    const token = auth.split(' ')[1];
    const user = await new JwtService().verify(token, {
      secret: jwtConstants.secret,
    });
    console.log(user);
    return user;
  }
}
