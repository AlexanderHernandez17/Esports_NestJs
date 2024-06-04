import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async findAll(
    puntajeMin?: number,
    order?: 'ASC' | 'DESC',
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ data: Tournament[], count: number }> {
    const queryBuilder = this.tournamentRepository.createQueryBuilder('tournament');
    
    if (puntajeMin) {
      queryBuilder.where('tournament.puntaje >= :puntajeMin', { puntajeMin });
    }
    
    const [data, count] = await queryBuilder
      .orderBy('tournament.puntaje', order || 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    
    return { data, count };
  }
}
