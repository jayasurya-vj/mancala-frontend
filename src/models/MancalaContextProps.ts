import { GameStatus, Player } from "./enum";

export interface MancalaContextProps {
   pitsA: number[],
   pitsB: number[],
   currentPlayer: Player|null,
   sessionPlayer: Player|null,
   gameStatus: GameStatus|null,
   notification: string|null,
   sendStartGameMessage: (player:Player,multiScreen:boolean) => void,
   sendInProgressGameMessage: (selectedPitIndex:number) => void
  }
  