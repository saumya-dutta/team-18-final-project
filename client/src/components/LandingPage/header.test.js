import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './header';

describe('Header component', () => {
  test('renders the Fit-ify icon', () => {
    render(<Header />);
    const icon = screen.getByTestId('run-circle');
    expect(icon).toBeInTheDocument();
  });

  test('renders the "Contact Us" button', () => {
    render(<Header />);
    const contactButton = screen.getByText('Contact Us');
    expect(contactButton).toBeInTheDocument();
  });

  test('renders the "Pricing" button', () => {
    render(<Header />);
    const pricingButton = screen.getByText('Pricing');
    expect(pricingButton).toBeInTheDocument();
  });

  test('renders the "Login" button', () => {
    render(<Header />);
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });
});
