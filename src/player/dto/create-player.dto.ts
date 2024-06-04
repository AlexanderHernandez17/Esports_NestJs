import { Result } from "src/results/entities/result.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";

export class CreatePlayerDto  {
    readonly name: string;
    readonly email: string;
    readonly age: number;
    readonly tournament: Tournament;
    readonly result: Result[];
}
