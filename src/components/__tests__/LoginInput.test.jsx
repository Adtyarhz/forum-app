import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from '../LoginInput';

describe('LoginInput', () => {
  it('should handle email typing correctly', async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'john@example.com');

    // Assert
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
  });

  it('should call login function when form is submitted', async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Action
    fireEvent.submit(screen.getByTestId('login-form'));

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
