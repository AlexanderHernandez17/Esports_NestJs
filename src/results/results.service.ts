import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const result = this.resultRepository.create(createResultDto);
    return this.resultRepository.save(result);
  }

  async findAllByTournamentId(tournamentId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [results, total] = await this.resultRepository.findAndCount({
      where: { tournament: { id: tournamentId } },
      take: limit,
      skip,
    });
    const totalPages = Math.ceil(total / limit);
    return { results, total, totalPages };
  }
}