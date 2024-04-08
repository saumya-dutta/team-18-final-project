import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // Example primary color
    },
    secondary: {
      main: '#19857b', // Example secondary color
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  
});

export default theme;