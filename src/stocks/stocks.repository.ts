import { Injectable } from '@nestjs/common';
import { Stock } from './entities/stock.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StocksRepository extends Repository<Stock> {
  constructor(private dataSource: DataSource) {
    super(Stock, dataSource.createEntityManager());
  }

  async findAllStocks(): Promise<Stock[]> {
    return await this.find({ order: { date: 'DESC' } });
  }

  async findGroupedBySymbol(): Promise<
    {
      symbol: string;
      date: string;
      open: number;
      close: number;
      high: number;
      low: number;
      volume: number;
    }[]
  > {
    return await this.dataSource
      .getRepository(Stock)
      .createQueryBuilder('stock')
      .select([
        'stock.symbol as symbol',
        `TO_CHAR(stock.date, 'YYYY-MM-DD') as date`,
        'stock.open as open',
        'stock.close as close',
        'stock.high as high',
        'stock.low as low',
        'stock.volume as volume',
      ])
      .orderBy('stock.symbol', 'ASC')
      .addOrderBy('stock.date', 'DESC')
      .getRawMany();
  }

  async findTotalHistoryBySymbol(symbol: string): Promise<Stock[]> {
    return await this.find({ where: { symbol } });
  }

  async upsertStock(entities: Stock[]) {
    return await this.upsert(entities, ['symbol', 'date']);
  }
}
