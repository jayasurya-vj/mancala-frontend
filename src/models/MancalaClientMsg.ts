import { ClientStatus, Player } from "./enum";

export interface MancalaClientMsg {
         gameId?: string|null,
         player: Player,
         type: ClientStatus,
         selectedPitIndex: number,
         multiScreen: boolean   

}