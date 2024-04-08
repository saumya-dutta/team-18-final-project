import React from 'react';
import { render, screen } from '@testing-library/react';
import FoodUI from './FoodUI';

describe('FoodUI Component', () => {
  test('renders without crashing', () => {
    render(<FoodUI />);
    expect(screen.getByText(/Create a Meal/i)).toBeInTheDocument();
  });
});