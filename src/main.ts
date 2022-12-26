import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { AllExceptionsFilter } from './filters/logger/logger.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpResponseInterceptor } from './interceptor/logger/logger.interceptor';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(new LoggerMiddleware().use);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://127.0.0.1:5672`],
      queue: `development`,
      queueOptions: {
        durable: false,
      },
    },
  });
  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
