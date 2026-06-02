import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RateLimitClientService } from '../rate-limit-client/rate-limit-client.service';
import { messages } from 'src/messages';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { AuthService } from 'src/auth/auth.service';
import { SecurityUtil } from 'src/helper.ts/security.util';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimitClient: RateLimitClientService,
    private readonly rabbitMqService: RabbitmqService,
    private readonly authService: AuthService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;
    const userId = (req as any).user?.userId || 'anonymous';
    const clientUserId = (req.headers['x-client-user-id'] as string) || null;

    const clientUserIp = req.ip || req.socket.remoteAddress || null;

    const result = await this.rateLimitClient.checkLimit(apiKey, userId);
    const userData = await this.authService.getUserById(userId);
    const encryptionKey = SecurityUtil.resolveUserEncryptionKey(userData);
    // 🔥 publish analytics event
    this.rabbitMqService.publishUsage({
      userId: SecurityUtil.encryptWithTenantKey(userId, encryptionKey || ''),
      apiKey,
      endpoint: SecurityUtil.encryptWithTenantKey(
        req.originalUrl,
        encryptionKey || '',
      ),
      method: req.method,
      allowed: result.allowed,
      clientUserId: SecurityUtil.encryptWithTenantKey(
        clientUserId || '',
        encryptionKey || '',
      ),
      clientUserIp: SecurityUtil.encryptWithTenantKey(
        clientUserIp || '',
        encryptionKey || '',
      ),
      timestamp: new Date(),
    });
    if (!result.allowed) {
      throw new HttpException(
        {
          message: messages.RateLimitExceed,
          retryAfter: result.retryAfter,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    next();
  }
}
