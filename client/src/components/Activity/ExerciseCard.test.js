import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExerciseCard from './ExerciseCard';

describe('ExerciseCard Component', () => {
  const mockExercise = {
    name: 'Test Exercise',
    gifUrl: 'http://example.com/test.gif',
    bodyPart: 'arm',
    target: 'biceps',
    equipment: 'dumbbell',
    instructions: ['Step 1: Do this', 'Step 2: Do that']
  };

  test('renders without crashing and displays exercise name', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('Test Exercise')).toBeInTheDocument();
  });
});