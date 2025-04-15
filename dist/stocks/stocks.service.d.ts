import { TwelveDataService } from '../external/twelve-data.service';
import { StocksRepository } from './stocks.repository';
import { StockResponseDto } from './dto/stock.dto';
export declare class StocksService {
    private readonly stockRepo;
    private twelveData;
    constructor(stockRepo: StocksRepository, twelveData: TwelveDataService);
    fetchDashboard(): Promise<{
        symbol: string;
        history: StockResponseDto[];
    }[]>;
    fetchAndSave(symbol: string, interval?: string, range?: string): Promise<{
        count: any;
    }>;
}
