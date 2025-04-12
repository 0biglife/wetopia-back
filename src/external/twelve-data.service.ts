import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TwelveDataService {
  constructor(private readonly http: HttpService) {}

  // outputsize 우선취급 : 800(평일 기준으로 3년치 데이터가 됨: 783)
  async fetch(symbol: string, interval: string, range: string) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=800&range=${range}&apikey=${process.env.TWELVE_DATA_API_KEY}`;

    const res = await firstValueFrom(this.http.get(url));

    if (res.data?.status === 'error') {
      throw new HttpException(res.data.message || 'TwelveData API Error', 500);
    }

    return res.data?.values || [];
  }
}
