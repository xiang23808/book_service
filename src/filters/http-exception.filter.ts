import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const message =
      exception instanceof HttpException ? exception.getResponse() : '未知错误';
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    Logger.log('错误提示', message);
    const errorResponse = {
      code: status,
      message: message,
      data: {},
    };
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(response);
  }
}
