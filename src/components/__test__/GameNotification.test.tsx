import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameNotification from './../GameNotification/GameNotification';
import { MancalaContext } from '../../context/MancalaContext';

// Mocking the MancalaContext with a default notification value
jest.mock('../../context/MancalaContext', () => ({
  MancalaContext: {
    Consumer: ({ children }: { children: (value: { notification: string }) => JSX.Element }) =>
      children({ notification: 'Mock Notification' }),
  },
}));

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    notification: 'Mock Notification', // Set a default notification value
  }));
});

describe('GameNotification Component', () => {
  test('renders notification text from context', () => {
    render(<GameNotification />);
    const notificationElement = screen.getByTestId('notification');
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveTextContent('Mock Notification');
  });

  test('renders empty notification when context value is empty', () => {
    // Mocking empty notification
    jest.spyOn(React, 'useContext').mockImplementation(() => ({ notification: '' }));

    render(<GameNotification />);
    const notificationElement = screen.getByTestId('notification');
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveTextContent('');
  });

  test('renders default notification when context value is undefined', () => {
    // Mocking undefined notification
    jest.spyOn(React, 'useContext').mockImplementation(() => ({ notification: undefined }));

    render(<GameNotification />);
    const notificationElement = screen.getByTestId('notification');
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveTextContent('');
  });
});
