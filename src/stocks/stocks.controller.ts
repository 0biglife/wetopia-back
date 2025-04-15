import { Controller, Get } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';

@Controller('stock')
export class StocksController {
  constructor(
    private readonly stockService: StocksService,
    private readonly logger: CustomLogger,
  ) {}

  @Get('dashboard')
  async fetchDashboard() {
    return await this.stockService.fetchDashboard();
  }
}
