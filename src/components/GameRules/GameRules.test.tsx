import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameRules from './GameRules';

describe('GameRules Component', () => {
  test('renders Game Rules heading', () => {
    render(<GameRules />);
    const heading = screen.getByTestId('rule-header');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Game Rules');
  });

  test('renders all rules correctly', () => {
    render(<GameRules />);
    const rules = screen.getAllByTestId('rule');
    expect(rules).toHaveLength(8);

    expect(rules[0]).toHaveTextContent('The game begins with one player picking up all of the pieces in any one of the pockets on his/her side.');
    expect(rules[1]).toHaveTextContent('Moving counter-clockwise, the player deposits one of the stones in each pocket until the stones run out');
    expect(rules[2]).toHaveTextContent("If you run into your own Mancala (store), deposit one piece in it. If you run into your opponent's Mancala, skip it and continue moving to the next pocket.");
    expect(rules[3]).toHaveTextContent('If the last piece you drop is in your own Mancala, you take another turn.');
    expect(rules[4]).toHaveTextContent('If the last piece you drop is in an empty pocket on your side, you capture that piece and any pieces in the pocket directly opposite.');
    expect(rules[5]).toHaveTextContent('Always place all captured pieces in your Mancala (store).');
    expect(rules[6]).toHaveTextContent('The game ends when all six pockets on one side of the Mancala board are empty.');
    expect(rules[7]).toHaveTextContent('Count all the pieces in each side. The winner is the player with the most pieces.');
  });
});
