import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Player } from 'src/player/entities/player.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tournament')
@Controller('Tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get()
  async findAll(
    @Query('puntajeMin') puntajeMin?: number,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.tournamentService.findAll(puntajeMin, order, page, pageSize);
  }

  @Post(':id/jugadores')
  async addJugador(
    @Param('id') id: string,
    @Body() player: Player,
  ) {
    return this.tournamentService.addJugador(id, player);
  }

  @Post(':tournamentId/players/:playerId/results')
  async addResultado(
    @Param('tournamentId') tournamentId: string,
    @Param('playerId') playerId: string,
    @Body('scores') scores: number,
  ) {
    return this.tournamentService.addResultado(tournamentId, playerId, scores);
  }
}
