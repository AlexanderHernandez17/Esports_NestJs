import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentService } from './tournament.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
