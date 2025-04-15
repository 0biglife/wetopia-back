import { TwelveDataService } from '../external/twelve-data.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { StocksRepository } from 'src/stocks/stocks.repository';
export declare class SeederService {
    private readonly stockRepo;
    private readonly twelveData;
    private readonly logger;
    private readonly context;
    constructor(stockRepo: StocksRepository, twelveData: TwelveDataService, logger: CustomLogger);
    seedAllSymbols(symbols: string[]): Promise<void>;
}
