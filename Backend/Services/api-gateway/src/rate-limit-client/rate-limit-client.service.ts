import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RateLimitClientService {
  checkLimit = async (
    apiKey: string,
    userId: string,
    clientUserId?: string,
    clientUserIp?: string,
  ) => {
    try {
      const data = await axios.post(
        `${process.env.RATE_LIMIT_SERVICE_URL}/limiter`,
        {
          apiKey: apiKey,
          userId: userId,
          clientUserId,
          clientUserIp,
        },
      );
      return data.data;
    } catch (error: any) {
      console.log(error);
      throw error.message;
    }
  };
}
