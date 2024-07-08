import { Game } from "./Game";

export interface MancalaServerMsg{
     sessionId: string,
     game: Game|null,
     error?: string|null
}