import {
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
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BcryptService } from './tool/bcrypt/bcrypt.service';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';
import { HelpsModule } from './information/helps/helps.module';
import { FeedbacksModule } from './information/feedbacks/feedbacks.module';
import { SurveyModule } from './task/survey/survey.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UserClockInLogModule } from './users/clock_in_log/clock.module';
import { UserTaskLogModule } from './users/task_log/task_log.module';
import { UserTaskModule } from './users/task/user_task.module';
import { UserInviteModule } from './users/invite/user_invite.module';
import { UserInviteLogModule } from './users/integral_log/user_invite_log.module';
import { ChatModule } from './socket/chat.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [customConfig], // 加载自定义配置项
    }),

    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('REDIS_CONFIG'),
      inject: [ConfigService],
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
    UserClockInLogModule,
    UserTaskLogModule,
    UserTaskModule,
    UserInviteModule,
    UserInviteLogModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService, SmsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UsersController);
  }
}
