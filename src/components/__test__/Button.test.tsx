import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button, { ButtonProps } from './../Button/Button';

describe('Button Component', () => {
  const defaultProps: ButtonProps = {
    buttonText: 'Click Me',
    onClick: jest.fn(),
    primaryButton: true,
  };

  test('renders button with correct text', () => {
    render(<Button {...defaultProps} />);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  test('calls onClick prop when button is clicked', () => {
    render(<Button {...defaultProps} />);
    const buttonElement = screen.getByTestId('button');
    fireEvent.click(buttonElement);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('renders as primary button by default', () => {
    render(<Button {...defaultProps} />);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toHaveClass('primary-button');
  });

  test('renders as secondary button when primaryButton prop is false', () => {
    const secondaryProps: ButtonProps = {
      ...defaultProps,
      primaryButton: false,
    };
    render(<Button {...secondaryProps} />);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toHaveClass('secondary-button');
  });
});
