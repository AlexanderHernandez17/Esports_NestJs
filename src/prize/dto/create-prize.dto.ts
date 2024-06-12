import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrizeDto {
  @ApiProperty({ description: 'Name of the prize' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Quantity of the prize' })
  @IsInt()
  @Min(1)
  quantity: number;
}