import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


export default function Footer() {
    const [value, setValue] = React.useState('recents');
    const navigate = useNavigate();



    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                sx={{ width: 1500 }}
                showLabels
                value={value}
            
            >
                {}
                <BottomNavigationAction label="Dashboard"
                    onClick={() => navigate('/')}
                
                />
                <BottomNavigationAction label="Food"
                    onClick={() => navigate('/Food')}
                
                />
                <BottomNavigationAction label="Activity"
                    onClick={() => navigate('/Activity')}
                
                />
                <BottomNavigationAction label="Profile"
                    onClick={() => navigate('/Profile')}
                
                />
            </BottomNavigation>
        </Paper>
    );
}