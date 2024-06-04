import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Player } from 'src/player/entities/player.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  puntos: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.results, { onDelete: 'CASCADE' })
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.result, { onDelete: 'CASCADE' })
  player: Player;
}

