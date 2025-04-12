import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from '../stocks.service';
import { StockCron } from './stocks.cron';
import { STOCK_SYMBOLS } from 'src/constants/symbols';

describe('StockCron', () => {
  let cron: StockCron;
  let mockService: Partial<StocksService>;

  beforeEach(async () => {
    mockService = {
      fetchAndSave: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [StockCron, { provide: StocksService, useValue: mockService }],
    }).compile();

    cron = module.get(StockCron);
  });

  it('주가 조회 후 DB 적재', async () => {
    // await cron.syncDailyStocks();

    expect(mockService.fetchAndSave).toHaveBeenCalledTimes(3);
    expect(mockService.fetchAndSave).toHaveBeenCalledWith(STOCK_SYMBOLS[0]);
    // expect(mockService.fetchAndSave).toHaveBeenCalledWith(STOCK_SYMBOLS[1]);
    // expect(mockService.fetchAndSave).toHaveBeenCalledWith(STOCK_SYMBOLS[2]);
  });
});
