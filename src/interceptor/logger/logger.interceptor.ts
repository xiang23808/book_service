import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../../tool/log/log4js';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map((data) => {
        const logFormat = {
          httpType: 'Response',
          ip: req.headers?.remoteip
            ? String(req.headers.remoteip)
            : req.ip.split(':').pop(),
          reqUrl: `${req.headers.host}${req.originalUrl}`,
          reqMethod: req.method,
          params: req.params,
          query: req.query,
          body: req.body,
          // data: data
        };
        Logger.access(JSON.stringify(logFormat));
        return data;
      }),
    );
  }
}
