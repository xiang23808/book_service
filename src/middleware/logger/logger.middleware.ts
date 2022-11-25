import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../../tool/log/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode; //响应状态吗
    next();
    //  组装日志信息
    const logFormat = {
      httpType: 'Request',
      ip: req.headers?.remoteip
        ? String(req.headers.remoteip)
        : req.ip.split(':').pop(),
      reqUrl: `${req.headers.host}${req.originalUrl}`,
      reqMethod: req.method,
      httpCode: res.statusCode,
      params: req.params,
      query: req.query,
      body: req.body,
    };
    // 根据状态码进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; //响应状态码
  next();
  // 组装日志信息
  const logFormat = {
    httpType: 'Request',
    ip: req.headers?.remoteip
      ? String(req.headers.remoteip)
      : req.ip.split(':').pop(),
    reqUrl: `${req.headers.host}${req.originalUrl}`,
    reqMethod: req.method,
    httpCode: res.statusCode,
    params: req.params,
    query: req.query,
    body: req.body,
  };
  //根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
