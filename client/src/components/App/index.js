import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import AuthForm from '../SignInAndSignUp';
import Food from '../Food';
import FitnessGoals from '../Activity';
import UserProfileForm from '../UserProfileForm';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../theme.js';
import { ThemeProvider } from '@mui/material/styles';

function App() {
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
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <div style={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                  {[
                    { text: 'Food', path: '/Food' },
                    { text: 'Activity', path: '/Activity' },
                    { text: 'Profile', path: '/user-profile' }
                  ].map((item) => (
                    <Button key={item.text} component={Link} to={item.path} color="inherit">
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
                <Route path="/Food" element={<Food />} />
                <Route path="/Activity" element={<FitnessGoals />} />
                <Route path="/user-profile" element={<UserProfileForm />} />
              </>
            ) : (
              <>
                <Route path="*" element={<AuthForm />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;