import { Module } from '@nestjs/common';
import { RateLimitClientService } from './rate-limit-client.service';

@Module({
  providers: [RateLimitClientService],
   exports: [RateLimitClientService],
})
export class RateLimitClientModule {}
