import { setTimeout as sleep } from 'timers/promises';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StocksService } from '../stocks.service';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { STOCK_SYMBOLS } from 'src/constants/symbols';

@Injectable()
export class StockCron {
  private readonly context = StockCron.name;
  constructor(
    private readonly stocksService: StocksService,
    private readonly logger: CustomLogger,
  ) {}

  // 실시간 동기화 (매 1시간마다 최신 데이터 갱신) -> Socket 필요
  // TODO : 구현

  // 장마감해야 받아오기 가능 -> 07시 기준 1회 업데이트 스케줄링
  @Cron('0 7 * * 1-5', { timeZone: 'Asia/Seoul' })
  // @Cron('0 55 * * * *') // 테스트용 -> 삭제 예정
  async syncHourlyPrice() {
    for (const symbol of STOCK_SYMBOLS) {
      try {
        await this.stocksService.fetchAndSave(symbol, '1day', '1day');
        this.logger.logSuccess(
          `${this.context}/syncHourlyPrice`,
          `Updated ${symbol} on ${new Date().toISOString()}`,
        );
        await sleep(8000);
      } catch (err) {
        this.logger.logError(`${this.context}/syncHourlyPrice`, err.message);
      }
    }
  }
}
