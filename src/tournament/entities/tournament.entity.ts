import { Player } from 'src/player/entities/player.entity';
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

  @OneToMany(() => Resultado, (resultado) => resultado.torneo)
  scores: Resultado[];
}

