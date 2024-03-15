import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import App from './index';


jest.mock("../Firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn(() => Promise.resolve({ user: { uid: 'testUser' } })),
  },
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Navbar presence', () => {
  test('renders the Activity link in the navbar', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    

    
    expect(screen.getByText('Activity')).toBeInTheDocument();
  });
});