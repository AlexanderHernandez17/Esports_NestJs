import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerSeeder } from './player.seed';
import { Player } from 'src/player/entities/player.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Result } from 'src/results/entities/result.entity';
import { TournamentSeeder } from './tournement.seed';
import { ResultSeeder } from './results.seed';
import { SeedService } from './seeds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Tournament, Result]), // Agrega las entidades al módulo
  ],
  providers: [
    PlayerSeeder,
    TournamentSeeder,
    ResultSeeder,
    SeedService,
  ],
})
export class SeedsModule {}
