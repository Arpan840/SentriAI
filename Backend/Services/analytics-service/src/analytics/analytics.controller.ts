import { Controller, Get, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}
  @Get('overview')
  async getOverview(@Req() req) {
    const apiKey = req.headers['x-api-key'] as string;
    return this.analyticsService.getOverview(apiKey);
  }

  @Get('top-endpoints')
  async getTopEndpoints(@Req() req) {
    const apiKey = req.headers['x-api-key'] as string;
    const { limit = 5, offset = 0 } = req.query;
    return this.analyticsService.getTopEndpoints(apiKey, Number(limit), Number(offset));
  }
  @Get('users')
  async userList(@Req() req) {
    const apiKey = req.headers['x-api-key'] as string;
    const { limit = 5, offset = 0 } = req.query;
    return this.analyticsService.userList(apiKey, Number(limit), Number(offset));
  }
}
