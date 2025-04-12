import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock } from './entities/stock.entity';
import { HttpModule } from '@nestjs/axios';
import { TwelveDataService } from '../external/twelve-data.service';
import { StockCron } from './cron/stocks.cron';
import { LoggerModule } from 'src/common/logger/logger.module';
import { StocksRepository } from './stocks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), HttpModule, LoggerModule],
  controllers: [StocksController],
  providers: [StocksService, StocksRepository, TwelveDataService, StockCron],
  exports: [StocksService, StocksRepository, StockCron],
})
export class StocksModule {}
