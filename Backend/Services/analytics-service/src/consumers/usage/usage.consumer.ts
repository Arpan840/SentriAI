import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnalyticsService } from 'src/analytics/analytics.service';
import type { UsageEvent } from 'src/analytics/analytics.interface';

@Controller('usage')
export class UsageController {
  constructor(private readonly analyticalService: AnalyticsService) {}
  @MessagePattern('api_usage')
  async handelApiUsage(@Payload() payload: UsageEvent) {
    console.log(payload, 'data is coming from other service');
    await this.analyticalService.saveUsageLog(payload);
  }
}
