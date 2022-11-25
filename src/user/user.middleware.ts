import { Injectable, NestMiddleware, Request } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(@Request() req, res: any, next: () => void) {
    next();
  }
}
