import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../../tool/log/log4js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 自定义的异常信息结构, 响应用
    const error_info = exception.response ? exception.response : exception;
    const error_data = exception.response?.data ? exception.response.data : {};
    const error_msg = exception.response
      ? exception.response.message
        ? exception.response.message
        : exception.response.errorMsg
      : '服务错误';
    const error_code = exception.response?.errorCode
      ? exception.response.errorCode
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // 自定义异常结构体, 日志用
    const data = {
      timestamp: new Date().toISOString(),
      ip: request.ip,
      reqUrl: request.originalUrl,
      reqMethod: request.method,
      httpCode: status,
      params: request.params,
      query: request.query,
      body: request.body,
      statusCode: error_code,
      errorMsg: error_msg,
      errorData: error_data,
      errorInfo: error_info,
    };

    // 404 异常响应
    if (status === HttpStatus.NOT_FOUND) {
      data.errorMsg = `资源不存在! 接口 ${request.method} -> ${request.url} 无效!`;
    }
    Logger.error(data);

    // 程序内异常捕获返回
    response.status(status).json({
      data: data.errorData,
      msg: data.errorMsg,
      code: data.statusCode,
    });
  }
}
