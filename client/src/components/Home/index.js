import * as React from 'react';

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import callApiLoadUserSettings from './callApiLoadUserSettings.js';
const serverURL = "";


const theme = createTheme({
  palette: {
    // mode: 'dark',
  },
});


const Home = () => {
  const currentCount = 5;


  const [userID, setUserID] = React.useState(1);
  const [mode, setMode] = React.useState(0);

  
  React.useEffect(() => {
    //loadUserSettings();
  }, []);
  
  const loadUserSettings = () => {
    callApiLoadUserSettings(serverURL, userID)
      .then(res => {
        //console.log("parsed: ", res[0].mode)
        setMode(res[0].mode);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        sx={{ 
          minHeight: '100vh',
          marginTop: theme.spacing(8),
          marginLeft: theme.spacing(4)
        }}
      >
        <Grid item>

          <Typography
            variant={"h3"}
          >

            {/* {mode === 0 ? ( */}
              {/* <React.Fragment>
                Welcome to MSci245!
              </React.Fragment> */}
            {/* ) : ( */}
              <React.Fragment>
                Welcome back, (add endpoint for getting name)!
              </React.Fragment>
            {/* )} */}
            <h1 style={{ marginBottom: "1rem" }}>Current streak</h1>
      <div>
        <p style={{ fontSize: "4rem", marginTop: "2rem", marginBottom: "0" }}>
          <span aria-label="fire emoji" role="img">
            🔥
          </span>
        </p>
      </div>
      <p style={{ fontSize: "2rem" }}>
        {currentCount} day
        {currentCount > 1 ? "s" : ""}
      </p>

          </Typography>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}




export default Home;