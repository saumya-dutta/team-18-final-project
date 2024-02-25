import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../Firebase'; 
import { Container, Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // New state for messages like email verification

  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setMessage("A verification email has been sent. Please check your inbox.");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Additional sign-in logic 
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (isSignUp) {
      await handleSignUp(email, password);
    } else {
      await handleSignIn(email, password);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        {message && <Alert severity="info" sx={{ mt: 2, width: '100%' }}>{message}</Alert>}
        <Box component="form" onSubmit={handleAuth} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AuthForm;