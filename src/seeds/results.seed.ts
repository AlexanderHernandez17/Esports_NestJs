import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/results/entities/result.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ResultSeeder {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async seedResults() {
    const tournaments = await this.tournamentRepository.find();

    const results = [];

    for (let i = 0; i < 10; i++) {
      const result = new Result();
      result.score = faker.datatype.number({ min: 0, max: 100 });

      // Seleccionar aleatoriamente un torneo del arreglo de torneos
      const randomTournamentIndex = Math.floor(Math.random() * tournaments.length);
      result.tournament = tournaments[randomTournamentIndex];

      results.push(result);
    }

    await this.resultRepository.save(results);
    console.log('Results have been seeded');
  }
}