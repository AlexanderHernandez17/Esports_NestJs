import { Controller, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrizeService } from './prize.service';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { Prize } from './entities/prize.entity';
import { PrizeDrawResult } from './entities/prizeDrawResult.entity';


@ApiTags('prizes')
@Controller('prizes')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @ApiOperation({ summary: 'Create a new prize' })
  @ApiBody({ type: CreatePrizeDto })
  @ApiResponse({ status: 201, description: 'Prize successfully created.', type: Prize })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  async createPrize(@Body() createPrizeDto: CreatePrizeDto): Promise<Prize> {
    return this.prizeService.createPrize(createPrizeDto);
  }


  @ApiOperation({ summary: 'Claim a prize for a player' })
  @ApiParam({ name: 'playerId', type: 'string', description: 'UUID of the player' })
  @ApiResponse({ status: 200, description: 'Prize successfully claimed.', type: PrizeDrawResult })
  @ApiResponse({ status: 400, description: 'Player has already claimed a prize today or no prizes available.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post('claim/:playerId')
  async claimPrize(@Param('playerId') playerId: string) {
    try {
      return await this.prizeService.assignPrizeToPlayer(playerId);
    } catch (error) {
      if (error.message === 'Player not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      if (error.message === 'Player has already claimed a prize today' || error.message === 'No prizes available') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Error hola hola', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

