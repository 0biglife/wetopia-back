import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stocks') // 테이블명
@Index(['symbol', 'date'], { unique: true }) // 인덱스 설정
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column({ type: 'date' })
  date: Date;

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
