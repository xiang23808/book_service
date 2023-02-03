import { Injectable } from '@nestjs/common';
// This file is auto-generated, don't edit it
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';
import { Logger } from '../tool/log/log4js';

@Injectable()
export class SmsService {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(
    accessKeyId: string,
    accessKeySecret: string,
  ): Dysmsapi20170525 {
    const config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
  }

  async sendSms(phone: string, code: string): Promise<any> {


    // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    const client = SmsService.createClient(
      process.env.SMS_ALIYUN_ACCESS_ID,
      process.env.SMS_ALIYUN_ACCESS_SECRET,
    );
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      templateCode: process.env.SMS_ALIYUN_TEMPLATE_CODE,
      templateParam: '{"code":"' + code + '"}',
      phoneNumbers: phone,
      signName: process.env.SMS_ALIYUN_SIGN_NAME,
    });
    try {
      // 复制代码运行请自行打印 API 的返回值
      const response = await client.sendSmsWithOptions(
        sendSmsRequest,
        new $Util.RuntimeOptions({}),
      );
      const res = JSON.stringify(response.body);
      Logger.log('阿里短信发送返回' + res);
      return res;
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  }

  async randomString(e) {
    e = e || 32;
    const t = '1234567890';
    const a = t.length;
    let n = '';
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
  }
}
