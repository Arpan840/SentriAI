import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsageLog } from 'src/entities/usage-log.entity';
import { Repository } from 'typeorm';
import { UsageEvent } from './analytics.interface';
import { messages } from 'src/messages';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(UsageLog)
    private readonly usageLogRepository: Repository<UsageLog>,
  ) {}

  async saveUsageLog(payload: UsageEvent) {
    try {
      const usageLog = this.usageLogRepository.create({
        userId: payload.userId,
        apiKey: payload.apiKey,
        clientUserId: payload?.clientUserId,
        clientUserIp: payload.clientUserIp,
        endpoint: payload.endpoint,
        method: payload.method,
        allowed: payload.allowed,
      });
      await this.usageLogRepository.save(usageLog);
      return { message: messages.AnalyticsDataAdded };
    } catch (error: any) {
      console.error('Analytics save failed:', error.message);

      // do not throw
      return;
    }
  }

  async getOverview(apiKey: string) {
    try {
      const totalRequests = await this.usageLogRepository.count({
        where: { apiKey },
      });
      const allowedRequests = await this.usageLogRepository.count({
        where: { apiKey, allowed: true },
      });
      const blockedRequests = await this.usageLogRepository.count({
        where: { apiKey, allowed: false },
      });
      const uniqueUsers = await this.usageLogRepository
        .createQueryBuilder('usage_log')
        .select('DISTINCT clientUserId')
        .where('usage_log.apiKey = :apiKey', { apiKey })
        .andWhere('usage_log.clientUserId IS NOT NULL')
        .getCount();
      return {
        totalRequests,
        allowedRequests,
        blockedRequests,
        uniqueUsers,
      };
    } catch (error: any) {
      console.error('Analytics overview retrieval failed:', error.message);
      return;
    }
  }

  // Top endPoints
  async getTopEndpoints(apiKey: string, limit: number, offset: number) {
    try {
      const topEndpoint = await this.usageLogRepository
        .createQueryBuilder('usage_log')
        .select('usage_log.endpoint')
        .addSelect('COUNT(*)', 'count')
        .where('usage_log.apiKey = :apiKey', { apiKey })
        .groupBy('usage_log.endpoint')
        .orderBy('count', 'DESC')
        .limit(limit)
        .offset(offset)
        .getRawMany();
        return topEndpoint;
    } catch (error: any) {
      console.error('Analytics top endpoints retrieval failed:', error.message);
      return;
    }
  }

  async userList(apiKey: string, limit: number, offset: number) {
    try {
      const usersList = await this.usageLogRepository
        .createQueryBuilder('usage_log')
        .select('DISTINCT "clientUserId"', 'clientUserId')
        .where('usage_log.apiKey = :apiKey', { apiKey })
        .andWhere('usage_log."clientUserId" IS NOT NULL')
        .limit(limit)
        .offset(offset)
        .getRawMany();
        return usersList;
    } catch (error: any) {
      console.error('Analytics user list retrieval failed:', error.message);
      return {message: error.message};
    }
  }
}
