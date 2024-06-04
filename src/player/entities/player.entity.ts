import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  edad: number;

  @ManyToOne(() => Tournament, (torneo) => torneo.jugadores, { onDelete: 'CASCADE' })
  torneo: Torneo;

  @OneToMany(() => Resultado, (resultado) => resultado.jugador)
  resultados: Resultado[];
}
