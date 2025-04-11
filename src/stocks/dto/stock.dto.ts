import { IsString, IsOptional } from 'class-validator';

export class StockHistoryDto {
  @IsString()
  symbol: string;

  @IsString()
  @IsOptional()
  interval?: string; // "1day"

  @IsString()
  @IsOptional()
  range?: string; // "1y"
}
