import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TwelveDataService {
  constructor(private readonly http: HttpService) {}

  async fetch(symbol: string, interval = '1day', range = '1y') {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=5000&apikey=${process.env.TWELVE_DATA_API_KEY}`;

    const res = await firstValueFrom(this.http.get(url));

    if (res.data?.status === 'error') {
      throw new HttpException(res.data.message || 'TwelveData API Error', 500);
    }

    return res.data?.values || [];
  }
}
