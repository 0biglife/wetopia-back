import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from '../stocks/entities/stock.entity';
import { TwelveDataService } from '../external/twelve-data.service';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'src/common/logger/logger.module';
import { StocksModule } from 'src/stocks/stocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    HttpModule,
    LoggerModule,
    StocksModule,
  ],
  providers: [SeederService, TwelveDataService],
  exports: [SeederService],
})
export class SeederModule {}
