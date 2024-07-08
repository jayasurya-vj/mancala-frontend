import { createContext, useDeferredValue, useEffect, useState } from "react";
import { MancalaContextProps } from "../models/MancalaContextProps";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ClientStatus, GameStatus, Player, Winner } from "../models/enum";
import { MancalaClientMsg } from "../models/MancalaClientMsg";
import { MancalaServerMsg } from "../models/MancalaServerMsg";
import { Game } from "../models/Game";

interface MancalaProviderProps {
    children: React.ReactNode;
}

let mancalaContextInitial = {
    pitsA: Array(7).fill(0),
    pitsB: Array(7).fill(0),
    currentPlayer: null,
    gameStatus: null,
    sessionPlayer: null,
    notification: null,
    sendStartGameMessage: () => { },
    sendInProgressGameMessage: () => { },
    setMultiScreen: () => { }
}

export const MancalaContext = createContext<MancalaContextProps>(mancalaContextInitial);

export const MancalaProvider: React.FC<MancalaProviderProps> = ({
    children
}) => {

    let searchParams = new URLSearchParams(document.location.search);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<MancalaServerMsg>(
        "ws://192.168.178.149:8080/mancala", {
        onOpen: () => console.log('WebSocket connection opened!'),
        onClose: () => console.log('WebSocket connection closed!'),
        onError: (event) => console.error('WebSocket error:', event),
        onMessage: (event) => console.log('Received message:', event.data),
    });

    const [pitsA, setPitsA] = useState<number[]>(mancalaContextInitial.pitsA);
    const [pitsB, setPitsB] = useState<number[]>(mancalaContextInitial.pitsB);
    const [gameId, setGameId] = useState<string | null>(mancalaContextInitial.currentPlayer);
    const [gameStatus, setGameStatus] = useState<GameStatus | null>(mancalaContextInitial.gameStatus);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(mancalaContextInitial.currentPlayer);
    const [sessionPlayer, setSessionPlayer] = useState<Player | null>(mancalaContextInitial.currentPlayer);
    const [multiScreen, setMultiScreen] = useState(false);
    const [notification, setNotification] = useState<string | null>("");

    useEffect(() => {
        let gameId = searchParams.get("gameId");
        let sessionPlayer = searchParams.get("sessionPlayer") as Player;
        if (gameId && sessionPlayer) {
            setGameId(gameId)
            setSessionPlayer(sessionPlayer)
            setMultiScreen(true)
        }
    }, [searchParams])

    useEffect(() => {
        if (lastJsonMessage) {
            if (lastJsonMessage.error) { setNotification(lastJsonMessage.error) }
            if (lastJsonMessage.game && lastJsonMessage.game.status) {
                let game: Game = lastJsonMessage.game;
                handleGameMessage(game);
            }
        }
    }, [lastJsonMessage])

    const handleGameMessage = (game: Game) => {
        if (game.gameId == null) setNotification("Server Error! Game Id not received!")
        else {
            if (gameId == null) { setGameId(game.gameId) }
            setCurrentPlayer(game.turn)
            setPitsA(game.pitsA)
            setPitsB(game.pitsB)
            setGameStatus(game.status)

            switch (game.status) {
                case GameStatus.Waiting: {
                    let link: string = window.location.origin + "?sessionPlayer=B&gameId=" + game.gameId;
                    setNotification(`Waiting for player B to join. Player B can join with the link - ${link}`)
                    break;
                }
                case GameStatus.InProgress: {
                    setNotification(`Player ${game.turn}'s turn`)
                    break;
                }
                case GameStatus.End: {
                    if (game.winner == Winner.Draw) setNotification(`Game is Draw. Game Over!`)
                    else setNotification(`Player ${game.winner} won the game. Game Over!`)
                    break;
                }

            }

        }
    }

    const sendStartGameMessage = (player: Player, multiScreen: boolean = false) => {
        if (player == null) { console.error("received player") }
        if (multiScreen == true && sessionPlayer == null) { setSessionPlayer(player); setMultiScreen(multiScreen); }

        let startMancalaClientMsg: MancalaClientMsg = {
            gameId,
            player,
            type: ClientStatus.Start,
            selectedPitIndex: -1,
            multiScreen: multiScreen
        }
        sendJsonMessage(startMancalaClientMsg);

    }
    const sendInProgressGameMessage = (selectedPitIndex: number) => {
        if (gameId == null) { console.error("received gameId as null") } else
            if (currentPlayer == null || selectedPitIndex == null || selectedPitIndex < 0 || selectedPitIndex > 5) { console.error("wrong inputs") } else {
                let mancalaClientMsg: MancalaClientMsg = {
                    gameId,
                    player: currentPlayer,
                    type: ClientStatus.InProgress,
                    selectedPitIndex,
                    multiScreen: multiScreen
                }
                sendJsonMessage(mancalaClientMsg)
            }
    }

    return (
        <MancalaContext.Provider
            value={{
                pitsA,
                pitsB,
                currentPlayer,
                gameStatus,
                sessionPlayer,
                setMultiScreen: (val: boolean) => { setMultiScreen(val) }, //remove
                sendStartGameMessage,
                sendInProgressGameMessage,
                notification
            }}
        >
            {children}

        </MancalaContext.Provider>
    );
}