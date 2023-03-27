import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * 全局WebSocket服务响应拦截器
 * 该Interceptor在网关中通过装饰器 @UseInterceptors 使用
 * 仅处理WebSocket服务成功响应拦截，异常是不会进入该拦截器
 */
export class WsServiceResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          message: '请求成功',
          data,
        };
      }),
    );
  }
}
