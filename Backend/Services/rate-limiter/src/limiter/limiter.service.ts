import { Injectable } from '@nestjs/common';
import { createRedisClient } from './Redis/Redis.connect';

@Injectable()
export class LimiterService {
  private readonly redisClient = createRedisClient();

  async checkLimit(userData: {
    apiKey: string;
    userId: string;
    clientUserIp?: string;
    clientUserId?: string;
  }) {
    try {
      const identifier =
        userData.clientUserId || userData.clientUserIp || userData.userId;

      const key = `rate:${userData.apiKey}:${identifier}`;

      const count = await this.redisClient.incr(key);
      if (count === 1) {
        await this.redisClient.expire(key, 60);
      }
      const limit = 10;
      const ttl = await this.redisClient.ttl(key);
      return {
        allowed: count <= limit,
        current: count,
        limit,
        remainingTime: Math.max(ttl, 0),
      };
    } catch (error: any) {
      console.log(error.message);
      throw error.message;
    }
  }
}
