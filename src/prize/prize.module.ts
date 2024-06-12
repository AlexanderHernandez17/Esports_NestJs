import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prize } from './entities/prize.entity';
import { Player } from 'src/player/entities/player.entity';
import { PrizeDrawResult } from './entities/prizeDrawResult.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prize, Player, Result, PrizeDrawResult])],
  controllers: [PrizeController],
  providers: [PrizeService],
})
export class PrizeModule {}
