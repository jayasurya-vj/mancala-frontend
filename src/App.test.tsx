import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import GameRules from './components/GameRules/GameRules';
import MancalaGame from './components/MancalaGame/MancalaGame';
import Notify from './components/GameNotification/GameNotification';

jest.mock('./components/GameRules/GameRules');
jest.mock('./components/MancalaGame/MancalaGame');
jest.mock('./components/GameNotification/GameNotification');

describe('App Component', () => {
  beforeEach(() => {
    (GameRules as jest.Mock).mockImplementation(() => <div data-testid="game-rules">GameRules Mock</div>);
    (MancalaGame as jest.Mock).mockImplementation(() => <div data-testid="mancala-game">MancalaGame Mock</div>);
    (Notify as jest.Mock).mockImplementation(() => <div data-testid="notify">Notify Mock</div>);
  });

  test('renders header with the correct text', () => {
    render(<App />);
    const headerElement = screen.getByTestId('app-header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Mancala Game');
  });

  test('renders Notify component', () => {
    render(<App />);
    const notifyElement = screen.getByTestId('notify');
    expect(notifyElement).toBeInTheDocument();
  });

  test('renders MancalaGame component', () => {
    render(<App />);
    const mancalaGameElement = screen.getByTestId('mancala-game');
    expect(mancalaGameElement).toBeInTheDocument();
  });

  test('renders GameRules component', () => {
    render(<App />);
    const gameRulesElement = screen.getByTestId('game-rules');
    expect(gameRulesElement).toBeInTheDocument();
  });
});
