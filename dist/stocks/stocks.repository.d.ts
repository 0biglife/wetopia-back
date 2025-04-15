import { Stock } from './entities/stock.entity';
import { DataSource, Repository } from 'typeorm';
export declare class StocksRepository extends Repository<Stock> {
    private dataSource;
    constructor(dataSource: DataSource);
    findAllStocks(): Promise<Stock[]>;
    findGroupedBySymbol(): Promise<{
        symbol: string;
        date: string;
        open: number;
        close: number;
        high: number;
        low: number;
    }[]>;
    findTotalHistoryBySymbol(symbol: string): Promise<Stock[]>;
    upsertStock(entities: Stock[]): Promise<import("typeorm").InsertResult>;
}
