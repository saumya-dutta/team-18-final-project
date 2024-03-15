import React from 'react';
import FoodUI from './FoodUI'; // Import the FoodUI component
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <FoodUI />
        </ThemeProvider>
    );
}