import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import AuthForm from '../SignInAndSignUp';
import Footer from '../Footer';
import Food from '../Food';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme.js';
import FitnessGoals from '../Activity';
import UserProfileForm from '../UserProfileForm';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [forceShowAuthForm, setForceShowAuthForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const toggleForceShowAuthForm = () => setForceShowAuthForm(!forceShowAuthForm);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <button onClick={toggleForceShowAuthForm} style={{position: 'fixed', top: 0, right: 0, zIndex: 1000}}>
          Toggle Auth Form
        </button>
        <Router>
          <Routes>
            {isSignedIn && !forceShowAuthForm ? (
              <>
                <Route path="/" element={<Navigate replace to="/Food" />} />
                <Route path="/Food" element={<Food />} />
                <Route path="/Activity" element={<FitnessGoals />} />
                <Route path="/user-profile" element={<UserProfileForm />} />
                {/* more branches will be added */}
              </>
            ) : (
              <>
                <Route path="*" element={<AuthForm />} />
              </>
            )}
          </Routes>
          <Footer/>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;