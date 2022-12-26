import { Test, TestingModule } from '@nestjs/testing';
import { AmqpController } from './amqp.controller';

describe('AmqpController', () => {
  let controller: AmqpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmqpController],
    }).compile();

    controller = module.get<AmqpController>(AmqpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
