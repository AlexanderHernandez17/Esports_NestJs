import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentService } from './tournament.service';
import { Player } from 'src/player/entities/player.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Player, Result])],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
