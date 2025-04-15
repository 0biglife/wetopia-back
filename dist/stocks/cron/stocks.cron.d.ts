import { StocksService } from '../stocks.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
export declare class StockCron {
    private readonly stocksService;
    private readonly logger;
    private readonly context;
    constructor(stocksService: StocksService, logger: CustomLogger);
    syncHourlyPrice(): Promise<void>;
}
