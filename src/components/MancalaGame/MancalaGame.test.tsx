import React from 'react';
import { jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MancalaGame from './MancalaGame';
import { MancalaContext } from '../../context/MancalaContext';


export interface MancalaContextProps {
    pitsA: number[],
    pitsB: number[],
    currentPlayer: string | null,
    sessionPlayer: string | null,
    gameStatus: string | null,
    notification: string | null,
    sendStartGameMessage: () => void,
    sendInProgressGameMessage: (val: any) => void
}

const mockSendInProgressGameMessage = jest.fn();

const mockMancalaContext = {
    pitsA: [4, 0, 7, 1, 3, 0, 10],
    pitsB: [0, 6, 2, 2, 0, 0, 11],
    currentPlayer: "A",
    gameStatus: "InProgress",
    sessionPlayer: null,
    notification: null,
    sendStartGameMessage: () => { },
    sendInProgressGameMessage: mockSendInProgressGameMessage
}

jest.mock('../../context/MancalaContext', () => ({
    MancalaContext: {
        Consumer: ({ children }: { children: (value: MancalaContextProps) => JSX.Element }) =>
            children(mockMancalaContext),
        Provider: ({ children }: { children: (value: MancalaContextProps) => JSX.Element }) => children,
    },
}));

describe('MancalaGame Component', () => {

    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockImplementation(() => (mockMancalaContext));
    })

    it('renders player sides', () => {
        render(<MancalaGame />);
        expect(screen.getByTestId('playerA-side-text')).toBeInTheDocument();
        expect(screen.getByTestId('playerB-side-text')).toBeInTheDocument();
    });

    it('renders player mancalas', () => {
        render(<MancalaGame />);
        expect(screen.getByTestId('mancala-player-A-text')).toHaveTextContent('10');
        expect(screen.getByTestId('mancala-player-B-text')).toHaveTextContent('11');
    });

    it('renders player pits', () => {
        render(<MancalaGame />);
        expect(screen.getAllByTestId('pits-player-A-text').map(pit => pit.textContent)).toEqual(['4', '0', '7', '1', '3', '0']);
        expect(screen.getAllByTestId('pits-player-B-text').map(pit => pit.textContent)).toEqual(['0','6', '2', '2', '0', '0']);
    });

    it('handles pit click correctly', () => {
        render(<MancalaGame />);
        const pitElement = screen.getByTestId(`pitsA-pit-0`);
        fireEvent.click(pitElement);
        expect(mockMancalaContext.sendInProgressGameMessage).toHaveBeenCalled();
    });

});