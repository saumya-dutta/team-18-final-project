import React from 'react';
import FoodTable from './FoodPage';
import WaterInput from './WaterInput';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

export default function Food() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FoodTable />
        <WaterInput />
      </div>
    </ThemeProvider>
  );
}