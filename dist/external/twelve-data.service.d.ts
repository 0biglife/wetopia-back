import { HttpService } from '@nestjs/axios';
export declare class TwelveDataService {
    private readonly http;
    constructor(http: HttpService);
    fetch(symbol: string, interval: string, range: string): Promise<any>;
}
