import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './typeOrm.module.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeyModule } from './api-key/api-key.module';
import { RateLimitClientModule } from './rate-limit-client/rate-limit-client.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { SdkModule } from './sdk/sdk.module';
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsService } from './analytics/analytics.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmConfig,
    AuthModule,
    UsersModule,
    ApiKeyModule,
    RateLimitClientModule,
    RabbitmqModule,
    SdkModule,
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, RateLimitMiddleware)
      .forRoutes(
        'auth/user',
        'api-key/generate',
        'api-key/my-keys',
        'analytics/overview',
        'analytics/top-endpoints',
      ); // apply only to this route
  }
}
