import { Injectable } from '@nestjs/common';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Player } from 'src/player/entities/player.entity';
import { Result } from 'src/results/entities/result.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async run() {
    const player = await this.generatePlayer();
    const tournament = await this.generateTournament();
    await this.generateResult(player, tournament);
  }

  async generatePlayer(): Promise<Player> {
    const player = new Player();
    player.name = faker.name.firstName() + ' ' + faker.name.lastName();
    player.email = faker.internet.email();
    player.age = faker.datatype.number({ min: 18, max: 45 });

    return await this.playerRepository.save(player);
  };

  async generateTournament(): Promise<Tournament> {
    const tournament = new Tournament();
    tournament.name = faker.lorem.words(3);
    tournament.score = faker.datatype.number({ min: 0, max: 100 });

    return await this.tournamentRepository.save(tournament);
  };

  async generateResult(player: Player, tournament: Tournament): Promise<Result> {
    const result = new Result();
    result.score = faker.datatype.number({ min: 0, max: 100 });
    result.player = player;
    result.tournament = tournament;

    return await this.resultRepository.save(result);
  }
}