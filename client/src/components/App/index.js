import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import AuthForm from '../SignInAndSignUp';
import Food from '../Food';
import FitnessGoals from '../Activity/index.js';
import UserProfileForm from '../Profile/index.js';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Button, Menu, MenuItem } from '@mui/material';
import theme from '../../theme.js';
import { ThemeProvider } from '@mui/material/styles';
import HomePage from '../LandingPage/homepage.js';
import Header from '../LandingPage/header.js';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import SignIn from '../SignInAndSignUp';
import { withFirebase } from '../Firebase';
// import { useNavigate } from 'react-router-dom';



function App() {
  // const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {[
          // { text: 'Food', path: '/Home' },
          { text: 'Food', path: '/Food' },
          { text: 'Activity', path: '/Activity' },
          { text: 'Profile', path: '/user-profile' }
        ].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isSignedIn && (
          <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ background: '#FFA756' }}>
              <Toolbar>
                <IconButton
                  // size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <RunCircleIcon />
                </IconButton>
                <div style={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                  {[
                    // { text: 'Home', path: '/Home' },
                    { text: 'Food', path: '/Food' },
                    { text: 'Activity', path: '/Activity' },
                    { text: 'Settings', path: '/user-profile' }
                  ].map((item) => (
                    <Button key={item.text} component={Link} to={item.path}
                      variant="contained"
                      color="warning"
                      sx={
                        {
                          // background: '#FFFFFF',
                          // marginRight: 20,
                          // marginLeft: 20,
                        }
                      }>
                      {item.text}
                    </Button>
                  ))}
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </>
        )}
        <div style={{ marginTop: isSignedIn ? 64 : 0 }}>
          <Routes>
            {isSignedIn ? (
              <>
                <Route path="/" element={<Navigate replace to="/Food" />} />
                {/* <Route path="/Home" element={< />} /> */}
                <Route path="/Food" element={<Food />} />
                <Route path="/Activity" element={<FitnessGoals />} />
                <Route path="/user-profile" element={<UserProfileForm />} />
              </>
            ) : (
              <>
                <Route path="*" element={<HomePage />} />
                <Route path="/auth" element={<SignIn />} /> 
              </>
            )}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;