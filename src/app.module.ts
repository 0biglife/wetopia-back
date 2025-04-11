import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // production - false
    }),
    StocksModule,
  ],
})
export class AppModule {}
