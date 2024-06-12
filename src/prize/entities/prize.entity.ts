import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { PrizeDrawResult } from './prizeDrawResult.entity';

@Entity()
export class Prize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @OneToMany(() => PrizeDrawResult, prizeDrawResult => prizeDrawResult.prize)
  prizeDrawResults: PrizeDrawResult[];

}
