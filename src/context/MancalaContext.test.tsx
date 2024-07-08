import { jest } from '@jest/globals'
import { render, fireEvent, getByTestId, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better jest-dom assertions
import { MancalaProvider, MancalaContext } from './MancalaContext';
import { useContext } from 'react';


export interface MancalaServerMsg {
    sessionId: string,
    game: any | null,
    error?: string | null
}
export enum Player {
    A = "A",
    B = "B"
}

export enum ClientStatus {
    Start = "Start",
    InProgress = "InProgress"
}


export enum GameStatus {
    Started = "Started",
    Waiting = "Waiting",
    InProgress = "InProgress",
    End = "End"
}

let sendJsonMessageMock = jest.fn();

const useWebSocketMock = {
    sendJsonMessage: (val:any) => sendJsonMessageMock(),
    lastJsonMessage: null,
    readyState:null
}


jest.mock('react-use-websocket', () => ({
    __esModule: true,
    default: ()=>useWebSocketMock,
    useWebSocket: () => useWebSocketMock,
}));




describe('MancalaProvider functions', () => {

    beforeEach(() => {         
        jest.spyOn(require('react-use-websocket'), 'useWebSocket').mockImplementation(() => (useWebSocketMock));
    });

    it('sends start game message correctly', () => {
        render(
            <MancalaProvider>
                <MancalaContext.Consumer>
                    {({ sendStartGameMessage }) => (
                        <button data-testid="start-btn" onClick={() => sendStartGameMessage(Player.A, false)}>Start</button>
                    )}
                </MancalaContext.Consumer>
            </MancalaProvider>
        );

        const buttonElement = screen.getByTestId('start-btn')

        fireEvent.click(buttonElement);

        expect(sendJsonMessageMock).toHaveBeenCalled();
    });

});
