//mport React from 'react';
import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {auth} from '../Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import backgroundImage from '../../assets/MSCI-app-login copy.jpg';
import {useNavigate} from 'react-router-dom';
import {Link as RouterLink} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';

// Create a theme instance with shades of gray
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#555555', // Dark gray
    },
    secondary: {
      main: '#aaaaaa', // Medium gray
    },
    background: {
      default: '#f5f5f5', // Light gray
      paper: '#ffffff',
    },
    text: {
      primary: '#333333', // Almost black
      secondary: '#777777', // Dark gray
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
});

function SignIn() {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const Popup = ({onClose, handleTest}) => (
  
    <div>
      <h1>Sign Up</h1>
      <Box component="form" noValidate onSubmit={handleSignUp} sx={{mt: 1}}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="signupEmail"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="signupPassword"
          autoComplete="current-password"
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="confirm-password"
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{mt: 3, mb: 2}}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };


  const handleSignUp = async event => {
    console.log("Sign up called")

    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('signupEmail');
    const password = data.get('signupPassword');
    const confirmPassword = data.get('confirm-password');
    console.log('AUTH: ', auth, email, password);

    // Maybe add additional validation, such as checking if the passwords match
    if (password !== confirmPassword) {
      console.error("Passwords don't match.");
      // Handle the error, such as displaying a message to the user
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('Created user:', userCredential.user);
      // Close the popup after successful sign-up
      togglePopup();
      // Redirect or perform additional actions after successful sign up
      navigate('/Food');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle errors here, such as displaying a notification to the user
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.get('email'),
        data.get('password'),
      );
      console.log('Signed in user:', userCredential.user);
      // Redirect or perform additional actions after successful sign in
      navigate('/Food');
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle errors here, such as displaying a notification
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Grid container component="main" sx={{ height: '100vh' }}> */}
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2" sx={{color: 'text.secondary'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="#" // Use "#" or remove `to` prop if the link should not navigate
                  onClick={togglePopup}
                  style={{color: 'inherit'}}
                >
                  Don't have an account? Sign Up
                </Link>
                {isPopupOpen && (
                  <Popup onClose={togglePopup} handleSignUp={handleSignUp} />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      {/* </Grid> */}
    </ThemeProvider>
  );
}

export default SignIn;