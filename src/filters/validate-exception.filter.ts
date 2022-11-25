import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const request = ctx.getRequest(); // 获取请求上下文中的request对象
    const response = ctx.getResponse(); // 获取请求上下文中的response对象
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; // 获取异常状态码
    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${
          status >= 500
            ? '服务器错误（Service Error）'
            : '客户端错误（Client Error）'
        }`;

    const nowTime = new Date().getTime();

    const errorResponse = {
      data: {},
      message,
      code: -1,
      date: nowTime,
      path: request.url,
    };
    // 将异常记录到logger中
    Logger.error(
      `【${nowTime}】${request.method} ${request.url} query:${JSON.stringify(
        request.query,
      )} params:${JSON.stringify(request.params)} body:${JSON.stringify(
        request.body,
      )}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter',
    );
    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
