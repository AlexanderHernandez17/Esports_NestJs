import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/entities/player.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Player, Result])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
