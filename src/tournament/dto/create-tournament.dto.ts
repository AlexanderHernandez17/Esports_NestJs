import { Player } from "src/player/entities/player.entity";
import { Result } from "src/results/entities/result.entity";

export class CreateTournamentDto {
    readonly name: string;
    readonly score: number;
    readonly saleDate: Date;
    readonly players: Player[];
    readonly results: Result[];
    

}
