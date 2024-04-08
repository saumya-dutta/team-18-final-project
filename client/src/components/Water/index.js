
import React from 'react';
import WaterUI from './WaterUI'; // Import the WaterUI component
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme'; // Assuming you have a similar theme setup

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <WaterUI />
        </ThemeProvider>
    );
}