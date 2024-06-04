import { Player } from 'src/player/entities/player.entity';
import { Result } from 'src/results/entities/result.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  score: number;

  @OneToMany(() => Player, (player) => player.tournament)
  players: Player[];

  @OneToMany(() => Result, (result) => result.tournament)
  results: Result[];
}

