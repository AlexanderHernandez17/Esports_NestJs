import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Player } from './entities/player.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Player, Result])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
