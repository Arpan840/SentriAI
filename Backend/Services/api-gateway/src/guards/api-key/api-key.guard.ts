import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { messages } from 'src/messages';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new HttpException(
        messages.Api_Key_Missing,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const apiKeyData = await this.apiKeyService.findByApiKey(apiKey);
    if (!apiKeyData) {
      throw new HttpException(messages.Wrong_Api_key, HttpStatus.UNAUTHORIZED);
    }
    request.apiKey = apiKeyData;
    return true;
  }
}
