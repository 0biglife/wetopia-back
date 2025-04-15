import { Expose } from 'class-transformer';

export class StockResponseDto {
  @Expose()
  date!: string;

  @Expose()
  open!: number;

  @Expose()
  close!: number;

  @Expose()
  high!: number;

  @Expose()
  low!: number;
}
