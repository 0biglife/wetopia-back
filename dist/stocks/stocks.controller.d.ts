import { StocksService } from './stocks.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
export declare class StocksController {
    private readonly stockService;
    private readonly logger;
    constructor(stockService: StocksService, logger: CustomLogger);
    fetchDashboard(): Promise<{
        symbol: string;
        history: {
            date: string;
            open: number;
            close: number;
            high: number;
            low: number;
            volume: number;
        }[];
    }[]>;
}
