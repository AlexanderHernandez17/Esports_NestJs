import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { Player } from 'src/player/entities/player.entity';
import { Result } from 'src/results/entities/result.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Result)
    private readonly resultsRepository: Repository<Result>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentRepository.create(createTournamentDto);
    return this.tournamentRepository.save(tournament);
  }

  async findAll(puntajeMin?: number, order: 'ASC' | 'DESC' = 'ASC', page: number = 1, pageSize: number = 10) {
    const queryBuilder = this.tournamentRepository.createQueryBuilder('tournament');

    if (puntajeMin !== undefined) {
      queryBuilder.andWhere('tournament.score >= :puntajeMin', { puntajeMin });
    }

    queryBuilder.orderBy('tournament.score', order)
                .skip((page - 1) * pageSize)
                .take(pageSize);

    const [results, total] = await queryBuilder.getManyAndCount();

    return {
      data: results,
      total,
      page,
      pageSize,
    };
  }
  

  async addJugador(tournamentId: string, player: Player): Promise<Player> {
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
    if (!tournament) {
      throw new Error('Torneo not found');
    }
    player.tournament = tournament;
    return this.playerRepository.save(player);
  }

  async addResultado(tournamentId: string, playerId: string, score: number): Promise<Result> {
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
    const player = await this.playerRepository.findOne({ where: { id: playerId } });
    if (!tournament || !player) {
      throw new Error('Torneo or Jugador not found');
    }
    const result = new Result();
    result.tournament = tournament;
    result.player = player;
    result.score = score;
    return this.resultsRepository.save(result);
  }
}
