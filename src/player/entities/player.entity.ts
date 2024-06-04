import { Result } from 'src/results/entities/result.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email:string

  @Column()
  age: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.players, { onDelete: 'CASCADE' })
  tournament: Tournament;

  @OneToMany(() => Result, (result) => result.player)
  result: Result[];
}
