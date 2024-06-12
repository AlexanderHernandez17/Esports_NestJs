import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prize } from './entities/prize.entity';
import { Player } from 'src/player/entities/player.entity';
import { PrizeDrawResult } from './entities/prizeDrawResult.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreatePrizeDto } from './dto/create-prize.dto';
import moment from 'moment-timezone';

@Injectable()
export class PrizeService {
  constructor(
    @InjectRepository(Prize)
    private prizeRepository: Repository<Prize>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(PrizeDrawResult)
    private prizeDrawResultRepository: Repository<PrizeDrawResult>,
  ) {}

  async createPrize(createPrizeDto: CreatePrizeDto): Promise<Prize> {
    const prize = this.prizeRepository.create(createPrizeDto);
    return this.prizeRepository.save(prize);
  }

  async assignPrizeToPlayer(playerId: string): Promise<PrizeDrawResult> {
    const player = await this.playerRepository.findOne({ where: { id: playerId }, relations: ['prizeDrawResults'] });

    if (!player) {
      throw new Error('Player not found');
    }

    const today = moment().tz('America/Bogota').startOf('day');

    const hasClaimedToday = player.prizeDrawResults.some(
      (result) => moment(result.createdAt).tz('America/Bogota').isSame(today, 'day')
    );

    if (hasClaimedToday) {
      throw new Error('Player has already claimed a prize today');
    }

    const availablePrizes = await this.prizeRepository.find();

    if (availablePrizes.length === 0) {
      throw new Error('No prizes available');
    }
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    const randomPrize = availablePrizes[randomIndex];
    await this.prizeRepository.delete(randomPrize.id); // Elimina el premio asignado para que no esté disponible nuevamente
    

    const prizeDrawResult = this.prizeDrawResultRepository.create({
      player,
      prize: randomPrize,
    });
    
    return this.prizeDrawResultRepository.save(prizeDrawResult);
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM, { timeZone: 'America/Bogota' })
  async assignUnclaimedPrizes() {
    const players = await this.playerRepository.find({ relations: ['prizeDrawResults'] });

    const today = moment().tz('America/Bogota').startOf('day');

    for (const player of players) {
      const hasClaimedToday = player.prizeDrawResults.some(
        (result) => moment(result.createdAt).tz('America/Bogota').isSame(today, 'day')
      );

      if (!hasClaimedToday) {
        await this.assignPrizeToPlayer(player.id);
      }
    }
  }
}


//   @Cron('59 23 * * *', { timeZone: 'America/Bogota' })
//   async assignPrizesToAllPlayers() {
//     const players = await this.playerRepository.find();
//     for (const player of players) {
//       const result = await this.prizeDrawResultRepository.findOne({ where: { player, createdAt: MoreThan(new Date(Date.now() - 86400000)) } });
//       if (!result) {
//         await this.assignPrizeToPlayer(player.id);
//       }
//     }
//   }
// }

