import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/player/entities/player.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class PlayerSeeder {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async seedPlayers() {
    const tournaments = await this.tournamentRepository.find();

    const players = [];

    for (let i = 0; i < 10; i++) {
      const player = new Player();
      player.name = faker.name.firstName() + ' ' + faker.name.lastName();
      player.email = faker.internet.email();
      player.age = faker.datatype.number({ min: 18, max: 40 });

      // Seleccionar aleatoriamente un torneo del arreglo de torneos
      const randomTournamentIndex = Math.floor(Math.random() * tournaments.length);
      player.tournament = tournaments[randomTournamentIndex];

      players.push(player);
    }

    await this.playerRepository.save(players);
    console.log('Players have been seeded');
  }
}