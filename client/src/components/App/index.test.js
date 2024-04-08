import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './index';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

// Mocking modules
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(() => jest.fn()) // Mocks the unsubscribe function
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(true).toBe(true); // Basic test to ensure component renders
  });
});