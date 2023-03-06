import {
  CacheModule,
  CacheStore,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import customConfig from './config';
import { UsersController } from './users/users.controller';
import { UserMiddleware } from './user/user.middleware';
import { AmqpController } from './amqp/amqp.controller';
import { AmqpService } from './amqp/amqp.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ArticlesModule } from './articles/articles.module';
import { LocalModule } from './upload/local/local.module';
import { redisStore } from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BcryptService } from './tool/bcrypt/bcrypt.service';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';
import { HelpsModule } from './information/helps/helps.module';
import { FeedbacksModule } from './information/feedbacks/feedbacks.module';
import { SurveyModule } from './task/survey/survey.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [customConfig], // 加载自定义配置项
    }),

    CacheModule.register({
      store: redisStore as unknown as CacheStore,
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('REDIS_CONFIG'),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (configService: ConfigService) =>
        configService.get('DATABASE_CONFIG'),
      inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    }),
    //微服务
    /*ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://127.0.0.1:5672`],
          queue: `development`,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),*/
    //队列
    // RabbitMQModule.forRoot(RabbitMQModule, {
    //   exchanges: [
    //     {
    //       name: 'rpc-queue',
    //       type: 'topic',
    //     },
    //   ],
    //   uri: 'amqp://localhost:5672',
    //   enableControllerDiscovery: true,
    // }),
    AuthModule,
    ArticlesModule,
    LocalModule,
    SmsModule,
    HelpsModule,
    FeedbacksModule,
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService, SmsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UsersController);
  }
}
