import { Injectable } from '@nestjs/common';
import { Stock } from './entities/stock.entity';
import { TwelveDataService } from '../external/twelve-data.service';
import { StocksRepository } from './stocks.repository';
import { plainToInstance } from 'class-transformer';
import { StockResponseDto } from './dto/stock.dto';
import { groupBy } from 'lodash';

@Injectable()
export class StocksService {
  constructor(
    private readonly stockRepo: StocksRepository,
    private twelveData: TwelveDataService,
  ) {}

  async fetchDashboard(): Promise<
    { symbol: string; history: StockResponseDto[] }[]
  > {
    const rows = await this.stockRepo.findGroupedBySymbol();

    const grouped = groupBy(rows, 'symbol');

    return Object.entries(grouped).map(([symbol, data]) => ({
      symbol,
      history: plainToInstance(
        StockResponseDto,
        data as Record<string, any>[],
        {
          excludeExtraneousValues: true,
        },
      ),
    }));
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

    await this.stockRepo.upsertStock(entities);
    return { count: entities.length };
  }
}
