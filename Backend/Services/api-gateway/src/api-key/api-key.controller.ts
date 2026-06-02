import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { messages } from 'src/messages';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post('generate')
  async generateApiKey(@Req() req: any) {
    const userId = req.user?.userId;
    if (!userId) {
      return { message: messages.UnAuthorized, status: 401 };
    }
    const newApiKey = await this.apiKeyService.createApiKey(userId, 'free');
    return newApiKey;
  }

  @Get('my-keys')
  async getMyApiKeys(@Req() req: any) {
    const userId = req.user?.userId;
    if (!userId) {
      return { message: messages.UnAuthorized, status: 401 };
    }
    const apiKeys = await this.apiKeyService.getApiKeysByUserId(userId);
    return apiKeys;
  }
}
