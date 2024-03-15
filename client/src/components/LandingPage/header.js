import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import SignIn from '../SignInAndSignUp/index';
import Drawer from '@mui/material/Drawer';




export default function LandingPage() {
    const [openLogin, setOpenLogin] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpenLogin(newOpen);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ background: '#FFA756' }}>
                <Toolbar>
                    <IconButton
                        // size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <RunCircleIcon data-testid="run-circle"/>
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Welcome to Fit-ify!
                    </Typography>
                    <Button
                        variant="outlined"
                        color="warning"
                        sx={
                            {
                                background: '#FFFFFF',
                                marginRight: 5,
                            }
                        }
                    > Contact Us </Button>
                    <Button
                        variant="outlined"
                        color="warning"
                        sx={
                            {
                                background: '#FFFFFF',
                                marginRight: 5,
                            }
                        }
                    > Pricing </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={toggleDrawer(true)}
                    > Login </Button>
                    <Drawer open={openLogin} onClose={toggleDrawer(false)} anchor="right">
                        <SignIn />
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    );
}