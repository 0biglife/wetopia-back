import { Controller, Post, Body } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StockHistoryDto } from './dto/stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Post('history')
  async getHistory(@Body() body: StockHistoryDto) {
    return await this.stockService.fetchHistory(body);
  }
}
