import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import AuthForm from '../SignInAndSignUp';
import Food from '../Food';
import FitnessGoals from '../Activity';
import UserProfileForm from '../UserProfileForm';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Button, Menu, MenuItem } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../theme.js';
import { ThemeProvider } from '@mui/material/styles';
import HomePage from '../LandingPage/homepage.js';
import Header from '../LandingPage/header.js';
import RunCircleIcon from '@mui/icons-material/RunCircle';
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
                    { text: 'Food', path: '/Food' },
                    { text: 'Activity', path: '/Activity' },
                    // { text: 'Profile', path: '/user-profile' }
                  ].map((item) => (
                    <Button key={item.text} component={Link} to={item.path}
                      variant="contained"
                      color="warning"
                      sx={
                        {
                          // background: '#FFFFFF',
                          marginRight: 20,
                          marginLeft: 20,
                        }
                      }>
                      {item.text}
                    </Button>
                  ))}
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button variant="contained" color="warning" 
                        sx={
                          {
                            // background: '#FFFFFF',
                            marginRight: 20,
                            marginLeft: 20,
                          }
                        }
                        {...bindTrigger(popupState)}>
                          Settings
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem component={Link} to={'/user-profile'}>Profile</MenuItem>
                          <MenuItem onClick={popupState.close}>My account</MenuItem>
                          <MenuItem onClick={popupState.close}>Logout</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
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
                <Route path="*" element={<HomePage />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;