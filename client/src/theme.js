import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            boxShadow: '0 0 0 2px rgba(85, 108, 214, 0.4)',
          },
        },
      },
    },
    
  },
});

export default theme;