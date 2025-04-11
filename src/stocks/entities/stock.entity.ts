import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  date: string;

  @Column('float')
  open: number;

  @Column('float')
  close: number;

  @Column('float')
  high: number;

  @Column('float')
  low: number;

  @Column('bigint')
  volume: number;
}
