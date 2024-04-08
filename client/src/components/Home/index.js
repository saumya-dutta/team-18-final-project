import * as React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = React.useState("");
  const serverURL = ""; // Make sure to replace this with your actual server URL
  const navigate = useNavigate();

  React.useEffect(() => {
    loadUserSettings({ email: 'okay@okay.com' });
  }, []);

  const callApiLoadUserSettings = async (serverURL, email) => {
    const url = `${serverURL}/api/user/email`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
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
        var parsed = JSON.parse(res.express); // Assuming 'express' is the correct response format
        setUserName(parsed[0].first_name + " " + parsed[0].last_name);
      })
      .catch(error => console.error("Failed to load user settings:", error));
  }

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={6} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: grey[50] }}>
              <Avatar sx={{ bgcolor: grey[500], width: 56, height: 56 }}>{userName.charAt(0)}</Avatar>
              <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold', color: grey[900] }}>Welcome back, {userName}!</Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, color: grey[800] }}>You have been active for 2 days 🔥</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover', backgroundImage: 'url(https://betsylife.com/wp-content/uploads/2015/12/honey-chipotle-chicken-bowls-I-howsweeteats.com-5.jpg)' }}>
              <CardActionArea onClick={() => navigate('/Food')}>
                <CardContent sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: grey[50], fontWeight: 'bold' }}>Nutrition Tracker</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover', backgroundImage: 'url(https://i.pinimg.com/736x/e2/05/01/e2050132c3314d54d8c4ac8301364927.jpg)' }}>
              <CardActionArea onClick={() => navigate('/Activity')}>
                <CardContent sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: grey[50], fontWeight: 'bold' }}>Exercise Tracker</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover', backgroundImage: 'url(https://vogue.ph/wp-content/uploads/2022/08/Most-Stylish-Water-Bottles-Square.jpg)' }}>
              <CardActionArea onClick={() => navigate('/Water')}>
                <CardContent sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: grey[50], fontWeight: 'bold' }}>Water Tracker</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={6} sx={{ p: 2, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: grey[100] }}>
              <Typography variant="h6" gutterBottom sx={{ color: grey[900] }}>Today's Motivation</Typography>
              <Box sx={{ width: '100%', overflow: 'hidden', paddingTop: '56.25%', position: 'relative' }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  src="https://www.youtube.com/embed/Cg_GW7yhq20?controls=0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="play/pause">
                  <YouTubeIcon sx={{ height: 38, width: 38, color: grey[800] }} />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;