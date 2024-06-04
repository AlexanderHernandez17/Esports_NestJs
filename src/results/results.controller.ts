import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger'; // Importar decoradores de Swagger
import { CreateResultDto } from './dto/create-result.dto';
import { ResultService } from './results.service';
import { Result } from './entities/result.entity'; // Importar la entidad Result para usarla en las decoraciones

@ApiTags('Results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @ApiCreatedResponse({ // Decorador para documentar la respuesta de creación exitosa
    description: 'The result has been successfully created.',
    type: Result, // Tipo de objeto de respuesta
  })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get(':tournamentId')
  @ApiOkResponse({ // Decorador para documentar la respuesta de éxito
    description: 'Retrieved results for the specified tournament.',
    type: Result, // Tipo de objeto de respuesta
    isArray: true, // Indica que se espera un arreglo de resultados
  })
  @ApiParam({ // Decorador para documentar el parámetro de ruta
    name: 'tournamentId',
    description: 'The ID of the tournament to retrieve results for.',
    type: 'string', // Tipo de parámetro
  })
  @ApiQuery({ // Decorador para documentar el parámetro de consulta
    name: 'page',
    description: 'The page number for paginated results.',
    type: 'number', // Tipo de parámetro
    required: false, // Indica que el parámetro es opcional
  })
  @ApiQuery({ // Decorador para documentar el parámetro de consulta
    name: 'limit',
    description: 'The maximum number of results per page.',
    type: 'number', // Tipo de parámetro
    required: false, // Indica que el parámetro es opcional
  })
  findAllByTournamentId(
    @Param('tournamentId') tournamentId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.resultService.findAllByTournamentId(tournamentId, page, limit);
  }
}