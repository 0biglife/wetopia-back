import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { TwelveDataService } from '../external/twelve-data.service';
import { StockHistoryDto } from './dto/stock.dto';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock) private stockRepo: Repository<Stock>,
    private twelveData: TwelveDataService,
  ) {}

  async fetchHistory(dto: StockHistoryDto) {
    const { symbol, interval = '1day', range = '1y' } = dto;
    const data = await this.twelveData.fetch(symbol, interval, range);

    if (!data || data.length === 0) {
      throw new HttpException('No data found', 404);
    }

    return {
      status: 'success',
      data,
    };
  }

  async fetchAndSave(symbol: string) {
    const values = await this.twelveData.fetch(symbol);

    const entities = values.map((item) => {
      const s = new Stock();
      s.symbol = symbol;
      s.date = item.datetime;
      s.open = parseFloat(item.open);
      s.close = parseFloat(item.close);
      s.high = parseFloat(item.high);
      s.low = parseFloat(item.low);
      s.volume = parseInt(item.volume);
      return s;
    });

    await this.stockRepo.save(entities);
    return { count: entities.length };
  }
}
