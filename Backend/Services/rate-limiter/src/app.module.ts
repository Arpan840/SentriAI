import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- YOU MISSED THIS
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LimiterModule } from './limiter/limiter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LimiterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}