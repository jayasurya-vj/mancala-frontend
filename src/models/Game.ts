import { GameStatus, Player, Winner } from "./enum";

export interface Game{
     gameId: string,
     pitsA: number[],
     pitsB: number[],
     turn: Player|null,
     gameOver: boolean,
     winner?: Winner|null,
     status: GameStatus|null
}