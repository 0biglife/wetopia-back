import { Controller, Get } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stock')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Get('dashboard')
  async fetchDashboard() {
    return await this.stockService.fetchDashboard();
  }
}
