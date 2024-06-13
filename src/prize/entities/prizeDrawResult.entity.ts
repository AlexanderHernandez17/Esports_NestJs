import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Prize } from './prize.entity';
import { Player } from 'src/player/entities/player.entity';

@Entity()
export class PrizeDrawResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Player, player => player.prizeDrawResults)
  player: Player;

  @ManyToOne(() => Prize, prize => prize.prizeDrawResults)
  prize: Prize;
}

