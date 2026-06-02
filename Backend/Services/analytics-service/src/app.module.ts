import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './typeorm.config.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UsageController } from './consumers/usage/usage.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmConfig,
    AnalyticsModule,
  ],
  controllers: [UsageController],
})
export class AppModule {}
