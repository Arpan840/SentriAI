import { Controller, Get, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { messages } from 'src/messages';
import { SecurityUtil } from 'src/helper.ts/security.util';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService,) {}
  @Get('overview')
  async getOverviewData(@Req() req: any) {
    const userId = req.user?.userId; // Assuming the user ID is stored in req.user after authentication
    const apiKey = await this.analyticsService.getCachedApiKey(userId);
    if (!apiKey) {
      return { message: messages.ApiKey_Not_Found, status: 404 };
    }
    const overviewData =
      await this.analyticsService.getOverviewAnalytics(apiKey);
    return overviewData;
  }

  @Get('top-endpoints')
  async getTopEndpointsData(@Req() req: any) {
    const userId = req.user?.userId; // Assuming the user ID is stored in req.user after authentication
    const apiKey = await this.analyticsService.getCachedApiKey(userId);
    if (!apiKey) {
      return { message: messages.ApiKey_Not_Found, status: 404 };
    }
    const userData = await this.analyticsService.storeUserDataInRedis(userId);
    const encryptionKey = SecurityUtil.resolveUserEncryptionKey(userData);
    const topEndpointsData =
      await this.analyticsService.getTopEndpointsAnalytics(apiKey);
    return topEndpointsData;
  }

  @Get('users')
  async getAnalyticsOfUsersList(@Req() req: any) {
    const userId = req.user?.userId; // Assuming the user ID is stored in req.user after authentication
    const apiKey = await this.analyticsService.getCachedApiKey(userId);
    if (!apiKey) {
      return { message: messages.ApiKey_Not_Found, status: 404 };
    }
     const userData = await this.analyticsService.storeUserDataInRedis(userId);
    const encryptionKey = SecurityUtil.resolveUserEncryptionKey(userData);
    const usersListData =
      await this.analyticsService.getAnalyticsOfUsersList(apiKey);
    return usersListData;
  }
}
