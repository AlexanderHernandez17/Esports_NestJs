import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Player } from 'src/player/entities/player.entity';
import { ApiTags, ApiQuery, ApiParam, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { CreateResultDto } from 'src/results/dto/create-result.dto';

@ApiTags('Tournament')
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}


  @Post()
  @ApiBody({ type: CreateTournamentDto })
  @ApiCreatedResponse({ description: 'The tournament has been successfully created.', type: Tournament })
  async createTournament( @Body() createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    return this.tournamentService.create(createTournamentDto);
  }
  
  @Get()
  @ApiQuery({
    name: 'puntajeMin',
    description: 'Minimum score for tournaments to retrieve.',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'Ordering direction for tournaments ("ASC" or "DESC").',
    enum: ['ASC', 'DESC'],
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for paginated results.',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'Number of tournaments per page.',
    type: 'number',
    required: false,
  })
  async findAll(
    @Query('puntajeMin') puntajeMin?: number,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.tournamentService.findAll(puntajeMin, order, page, pageSize);
  }

  @Post(':id/jugadores')
  @ApiParam({ name: 'id', description: 'ID of the tournament to add the player to.' })
  async addJugador(
    @Param('id') id: string,
    @Body() player: Player,
  ) {
    return this.tournamentService.addJugador(id, player);
  }

  @Post(':tournamentId/players/:playerId/results')
  @ApiParam({ name: 'tournamentId', description: 'ID of the tournament to add the result to.' })
  @ApiParam({ name: 'playerId', description: 'ID of the player to add the result for.' })
  @ApiBody({ type: Number, description: 'Score for the player.' }) 
  @ApiCreatedResponse({ description: 'The result has been successfully added.' })
  async addResultado(
    @Param('tournamentId') tournamentId: string,
    @Param('playerId') playerId: string,
    @Body() createResultDto: CreateResultDto, 
  ) {
    const { score } = createResultDto;
    return this.tournamentService.addResultado(tournamentId, playerId, score);
  }
}