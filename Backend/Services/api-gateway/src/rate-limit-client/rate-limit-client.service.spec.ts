import { Test, TestingModule } from '@nestjs/testing';
import { RateLimitClientService } from './rate-limit-client.service';

describe('RateLimitClientService', () => {
  let service: RateLimitClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateLimitClientService],
    }).compile();

    service = module.get<RateLimitClientService>(RateLimitClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
