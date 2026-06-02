import { Body, Controller, Post } from '@nestjs/common';
import { LimiterService } from './limiter.service';

interface LimiterBody {
  apiKey: string;
  userId: string;
  clientUserId?: string;
  clientUserIp?: string;
}
@Controller('limiter')
export class LimiterController {
  constructor(private readonly limiterService: LimiterService) {}

  @Post()
  async check(@Body() body: LimiterBody) {
    const Limiter = await this.limiterService.checkLimit(body);
    return Limiter;
  }
}
