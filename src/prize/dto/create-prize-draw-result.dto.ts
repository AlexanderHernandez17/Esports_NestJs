// create-prize-draw-result.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePrizeDrawResultDto {
  @IsInt()
  @IsNotEmpty()
  playerId: number;

  @IsInt()
  @IsNotEmpty()
  prizeId: number;
}

// prize-draw-result.dto.ts
export class PrizeDrawResultDto {
  id: number;
  createdAt: Date;
  playerId: number;
  prizeId: number;
}
