import { Module } from '@nestjs/common';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/player/entities/player.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { ResultController } from './results.controller';
import { ResultService } from './results.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Player, Result])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultsModule {}
