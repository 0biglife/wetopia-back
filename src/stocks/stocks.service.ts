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

  async fetchAndSave(symbol: string, interval = '1day', range = '1day') {
    const values = await this.twelveData.fetch(symbol, interval, range);

    const entities = values.map((item) => {
      const s = new Stock();
      s.symbol = symbol;
      s.date = new Date(item.datetime);
      s.open = parseFloat(item.open);
      s.close = parseFloat(item.close);
      s.high = parseFloat(item.high);
      s.low = parseFloat(item.low);
      s.volume = parseInt(item.volume);
      return s;
    });

    await this.stockRepo.upsert(entities, ['symbol', 'date']); // 중복 방지
    return { count: entities.length };
  }
}
