import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


export default function Footer() {
    const [value, setValue] = React.useState('recents');
    const navigate = useNavigate();


    //   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setValue(newValue);
    //   };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                sx={{ width: 1500 }}
                showLabels
                value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            >
                {/* <button>Goals</button> */}
                <BottomNavigationAction label="Dashboard"
                    onClick={() => navigate('/')}
                // icon={<RestoreIcon />}
                />
                <BottomNavigationAction label="Food"
                    onClick={() => navigate('/Food')}
                // icon={<FavoriteIcon />} 
                />
                <BottomNavigationAction label="Activity"
                    onClick={() => navigate('/Activity')}
                // icon={<LocationOnIcon />} 
                />
                <BottomNavigationAction label="Profile"
                    onClick={() => navigate('/Profile')}
                // icon={<LocationOnIcon />} 
                />
            </BottomNavigation>
        </Paper>
    );
}