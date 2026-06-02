import { Injectable } from '@nestjs/common';
import { ApiKey } from './api-key.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}
  generateKey() {
    return 'rk_' + randomBytes(24).toString('hex');
  }

  async createApiKey(userId: string, plan: string) {
    const apiKey = this.generateKey();
    const newApiKey = this.apiKeyRepository.create({
      key: apiKey,
      user: { id: userId },
      plan,
    });
    await this.apiKeyRepository.save(newApiKey);
    return newApiKey;
  }

  async getApiKeysByUserId(userId: string) {
    return this.apiKeyRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async findByApiKey(apiKey:string){
    return await this.apiKeyRepository.findOne({where:{key:apiKey}})
  }
}
