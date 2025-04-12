import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import { StocksModule } from './stocks/stocks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SeederModule } from './seeder/seeder.module';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // production - false
      // logging: true, // 쿼리 로그 확인
    }),
    ScheduleModule.forRoot(), // Cron 스케줄러 등록
    StocksModule,
    SeederModule,
    LoggerModule,
  ],
})
export class AppModule {}
