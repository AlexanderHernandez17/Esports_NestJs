import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Player } from 'src/player/entities/player.entity';
import { Result } from 'src/results/entities/result.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class TournamentSeeder {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
  ) {}

  async seedTournaments() {
    const tournaments = [];

    for (let i = 0; i < 10; i++) {
      const tournament = new Tournament();
      tournament.name = faker.lorem.words(3);

      // Obtener jugadores y resultados aleatorios
      const players = await this.getRandomEntities(Player, 5);
      const results = await this.getRandomEntities(Result, 5);

      tournament.players = players;
      tournament.results = results;

      tournaments.push(tournament);
    }

    await this.tournamentRepository.save(tournaments);
    console.log('Tournaments have been seeded');
  }

  async getRandomEntities(entityClass: any, count: number): Promise<any[]> {
    const entities = await this.shuffle(await this.getAllEntities(entityClass));
    return entities.slice(0, count);
  }

  async getAllEntities(entityClass: any): Promise<any[]> {
    return this.tournamentRepository.find();
  }

  async shuffle(array: any[]): Promise<any[]> {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}