import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock } from './entities/stock.entity';
import { HttpModule } from '@nestjs/axios';
import { TwelveDataService } from '../external/twelve-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), HttpModule],
  controllers: [StocksController],
  providers: [StocksService, TwelveDataService],
})
export class StocksModule {}
