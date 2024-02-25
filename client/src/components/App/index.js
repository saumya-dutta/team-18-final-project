import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../Firebase'; // Ensure this import path is correct based on your project structure
import AuthForm from '../SignInAndSignUp'; // Adjusted path to match your updated structure
import Footer from '../Footer';
import Food from '../Food';


// Import other components as needed

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // Temporary toggle to force showing the AuthForm for UI/UX testing
  const [forceShowAuthForm, setForceShowAuthForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Function to toggle the forceShowAuthForm state
  const toggleForceShowAuthForm = () => setForceShowAuthForm(!forceShowAuthForm);

  return (
    <div>
      {/* Temporary Button to toggle the AuthForm view */}
      <button onClick={toggleForceShowAuthForm} style={{position: 'fixed', top: 0, right: 0, zIndex: 1000}}>
        Toggle Auth Form
      </button>
      <Router>
        <Routes>
          {isSignedIn && !forceShowAuthForm ? (
            <>
              {/* Redirect to /Food as a default route if signed in */}
              <Route path="/" element={<Navigate replace to="/Food" />} />
              <Route path="/Food" element={<Food />} />
              
              
              {/* You can define more routes for signed-in users here */}
            </>
          ) : (
            <>
              {/* Show AuthForm if not signed in or forceShowAuthForm is true */}
              <Route path="*" element={<AuthForm />} />
            </>
          )}
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;