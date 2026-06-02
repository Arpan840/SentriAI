import { Test, TestingModule } from '@nestjs/testing';
import { LimiterController } from './limiter.controller';

describe('LimiterController', () => {
  let controller: LimiterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LimiterController],
    }).compile();

    controller = module.get<LimiterController>(LimiterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
