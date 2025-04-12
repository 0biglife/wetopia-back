import { Injectable } from '@nestjs/common';
import { Stock } from '../stocks/entities/stock.entity';
import { TwelveDataService } from '../external/twelve-data.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { setTimeout as sleep } from 'timers/promises';
import { StocksRepository } from 'src/stocks/stocks.repository';

@Injectable()
export class SeederService {
  private readonly context = SeederService.name;
  constructor(
    private readonly stockRepo: StocksRepository,
    private readonly twelveData: TwelveDataService,
    private readonly logger: CustomLogger,
  ) {}

  async seedAllSymbols(symbols: string[]) {
    for (const symbol of symbols) {
      const values = await this.twelveData.fetch(symbol, '1day', '1y');
      const stocks = values.map((item) => {
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

      await this.stockRepo.upsertStock(stocks);
      this.logger.logSuccess(
        `${this.context}/seedAllSymbols`,
        `Seeded ${symbol}: ${stocks.length} entries`,
      );

      await sleep(8000);
    }
  }
}
