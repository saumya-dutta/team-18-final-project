import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WaterTrackerUI from './WaterUI';

describe('WaterTrackerUI Component', () => {
    test('renders without crashing', () => {
        render(<WaterTrackerUI />);
        expect(true).toBe(true); // Simplified assertion just to ensure the test runs
    });
});