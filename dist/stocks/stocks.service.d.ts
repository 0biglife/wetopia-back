import { TwelveDataService } from '../external/twelve-data.service';
import { StocksRepository } from './stocks.repository';
export declare class StocksService {
    private readonly stockRepo;
    private twelveData;
    constructor(stockRepo: StocksRepository, twelveData: TwelveDataService);
    fetchDashboard(): Promise<{
        symbol: string;
        history: {
            date: string;
            open: number;
            close: number;
            high: number;
            low: number;
        }[];
    }[]>;
    fetchAndSave(symbol: string, interval?: string, range?: string): Promise<{
        count: any;
    }>;
}
