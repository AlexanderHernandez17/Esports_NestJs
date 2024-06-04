import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  puntaje: number;

  @OneToMany(() => Jugador, (jugador) => jugador.torneo)
  jugadores: Jugador[];
}

