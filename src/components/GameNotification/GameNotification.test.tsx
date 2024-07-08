import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameNotification from './GameNotification';
import { MancalaContext } from '../../context/MancalaContext';



jest.mock('../../context/MancalaContext', () => ({
  MancalaContext: {
    Consumer: ({ children }: { children: (value: { notification: string }) => JSX.Element }) =>
      children({ notification: 'Mock Notification' }),
  },
}));

describe('GameNotification Component', () => {
  beforeEach(() => { 
      jest.spyOn(React, 'useContext').mockImplementation(() => ({
      notification: 'Mock Notification', 
    }));
  })


  test('renders notification text from context', () => {
    render(<GameNotification />);
    const notificationElement = screen.getByTestId('notification');
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveTextContent('Mock Notification');
  });

  test('renders empty notification when context value is empty', () => {

    render(<GameNotification />);
    const notificationElement = screen.getByTestId('notification');
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveTextContent('Mock Notification');
  });

  test('renders default notification when context value is undefined', () => {

    render(<GameNotification />);
    const notificationElement = screen.getByTestId('notification');
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveTextContent('Mock Notification');
  });
});
