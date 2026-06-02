import { Injectable } from '@nestjs/common';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { AuthService } from 'src/auth/auth.service';
import { createRedisClient } from 'src/Redis/Redis.connect';
import axios from 'axios';

@Injectable()
export class AnalyticsService {
  private readonly redisClient = createRedisClient();

  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly authService: AuthService,
  ) {}

  getOverviewAnalytics = async (apiKey: string) => {
    try {
      const analyticsData = await axios.get(
        process.env.ANALYTICS_ENDPOINT + '/overview',
        {
          headers: {
            'x-api-key': apiKey,
          },
        },
      );
      return analyticsData.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getTopEndpointsAnalytics = async (apiKey: string) => {
    try {
      const analyticsData = await axios.get(
        process.env.ANALYTICS_ENDPOINT + '/top-endpoints',
        {
          headers: {
            'x-api-key': apiKey,
          },
        },
      );
      return analyticsData.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getAnalyticsOfUsersList = async (apiKey: string) => {
    try {
      const analyticsData = await axios.get(
        process.env.ANALYTICS_ENDPOINT + '/users',
        {
          headers: {
            'x-api-key': apiKey,
          },
        },
      );
      return analyticsData.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  async getCachedApiKey(userId: string): Promise<string | null> {
    const cacheKey = `analytics_overview_${userId}`;
    let apiKey = await this.redisClient.get(cacheKey);

    if (apiKey) {
      return JSON.parse(apiKey);
    }

    const dataBaseApiKey = await this.apiKeyService.getApiKeysByUserId(userId);
    apiKey = dataBaseApiKey?.key || null;
    await this.redisClient.set(cacheKey, JSON.stringify(apiKey));
    return apiKey;
  }

  async storeUserDataInRedis(userId: string) {
    const cacheKey = `user_data_${userId}`;

    const cachedUser = await this.redisClient.get(cacheKey);

    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const userData = await this.authService.getUserById(userId);

    await this.redisClient.set(cacheKey, JSON.stringify(userData));

    return userData;
  }
}
