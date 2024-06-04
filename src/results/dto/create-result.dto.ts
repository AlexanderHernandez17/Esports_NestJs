import { Player } from "src/player/entities/player.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";

export class CreateResultDto {
    readonly   score: number;
    tournament: Tournament;
    readonly saleDate: Date;
    player: Player;
}
