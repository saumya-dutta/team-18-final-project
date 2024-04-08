
import React from 'react';
import WaterUI from './WaterUI'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme'; 

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <WaterUI />
        </ThemeProvider>
    );
}