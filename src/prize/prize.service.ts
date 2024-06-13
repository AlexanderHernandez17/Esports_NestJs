import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prize } from './entities/prize.entity';
import { Player } from 'src/player/entities/player.entity';
import { PrizeDrawResult } from './entities/prizeDrawResult.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreatePrizeDto } from './dto/create-prize.dto';
import * as moment from 'moment-timezone';

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
    console.log('Buscando jugador con ID:', playerId);
    let player: Player;
    try {
      player = await this.playerRepository.findOne({ where: { id: playerId }, relations: ['prizeDrawResults'] });
      console.log('Resultado de búsqueda de jugador:', player);
    } catch (error) {
      console.error('Error al buscar jugador:', error);
      throw new Error('Error al buscar jugador');
    }

     console.log('Calculando la fecha de hoy...');
    const today = moment().tz('America/Bogota').startOf('day');
    console.log('Fecha de hoy:', today.format());

    const hasClaimedToday = player.prizeDrawResults.some(
      (result) => moment(result.createdAt).tz('America/Bogota').isSame(today, 'day')
    );

    if (hasClaimedToday) {
      console.log('Jugador ya ha reclamado un premio hoy');
      throw new Error('Player has already claimed a prize today');
    }

    console.log('Buscando premios disponibles');
    const availablePrizes = await this.prizeRepository.find();

    if (availablePrizes.length === 0) {
      console.log('No hay premios disponibles');
      throw new Error('No prizes available');
    }
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    const randomPrize = availablePrizes[randomIndex];
    console.log('Premio asignado:', randomPrize);
    // await this.prizeRepository.delete(randomPrize.id); // Elimina el premio asignado para que no esté disponible nuevamente
    
    console.log('Creando resultado del sorteo de premios...');
    const prizeDrawResult = this.prizeDrawResultRepository.create({
      player,
      prize: randomPrize,
    });
    console.log('Resultado del sorteo de premios creado:', prizeDrawResult);

    try {
      console.log('Guardando resultado del sorteo del premio en la base de datos...');
      const savedPrizeDrawResult = await this.prizeDrawResultRepository.save(prizeDrawResult);
      console.log('Resultado del sorteo del premio guardado:', savedPrizeDrawResult);
      
      return savedPrizeDrawResult;
    } catch (error) {
      console.error('Error al guardar el resultado del sorteo del premio:', error);
      throw new Error('Error al guardar el resultado del sorteo del premio');
    }
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

