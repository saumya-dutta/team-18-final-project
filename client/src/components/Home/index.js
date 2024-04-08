import * as React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import callApiLoadUserSettings from './callApiLoadUserSettings.js';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';

const Home = () => {
  const [userName, setUserName] = React.useState("");
  const serverURL = ""

  React.useEffect(() => {
    loadUserSettings({ email: 'okay@okay.com' });
  }, []);

  const callApiLoadUserSettings = async (serverURL, email) => {
    const url = serverURL + "/api/user/email";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user settings');
    }

    try {
      const body = await response.json();
      return body;
    } catch (error) {
      throw new Error('Failed to parse server response');
    }
  }

  const loadUserSettings = ({ email }) => {
    callApiLoadUserSettings(serverURL, email)
      .then(res => {
        var parsed = JSON.parse(res.express);
        setUserName(parsed[0].first_name + " " + parsed[0].last_name);
      });
  }

  return (
    <div>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '50vh' }}
      >
        <Grid item xs={12} md={8} lg={6}>
          <Box p={2}>
            <Sheet
              variant="outlined"
              sx={{ p: 2 }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>{Array.from(userName)[0]}</Avatar>
                <Typography noWrap variant="h5">Welcome back, {userName}!</Typography>
              </Stack>
            </Sheet>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6">Your current streak:</Typography>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                />
                <AspectRatio minHeight="120px" maxHeight="200px">
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/01/71/23/49/1000_F_171234990_cSNErNz2LkXTP7YxMNzRY3jDhz0laMa2.jpg"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2">5 DAYS</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">check back in tomorrow!</Typography>
                  
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
