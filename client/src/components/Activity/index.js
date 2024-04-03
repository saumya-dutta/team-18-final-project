import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { fetchData } from './utils/fetchData';
import SearchBar from './SearchExercises';
import Exercises from './Exercises';
import SleepPage from './SleepPage';

import WorkoutRoutinePage from './Routine';
import { Navigate, useNavigate } from 'react-router-dom';

export default function App() {
    const [exercises, setExercises] = useState([]);
    const [activeTab, setActiveTab] = React.useState(0);
    const navigate = useNavigate();

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    // position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon fontSize="sm" />}
                        sx={{ pl: 0 }}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            href="#some-link"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon onClick={() => navigate('/')}/>
                        </Link>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            Activity
                        </Typography>
                    </Breadcrumbs>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        Activity
                    </Typography>
                </Box>
                <Tabs
                    value={activeTab}
                    onChange={(event, newValue) => setActiveTab(newValue)}
                    sx={{
                        bgcolor: 'transparent',
                    }}
                >
                    <TabList
                        tabFlex={1}
                        size="sm"
                        sx={{
                            pl: { xs: 0, md: 4 },
                            justifyContent: 'left',
                            [`&& .${tabClasses.root}`]: {
                                fontWeight: '600',
                                flex: 'initial',
                                color: 'text.tertiary',
                                [`&.${tabClasses.selected}`]: {
                                    bgcolor: 'transparent',
                                    color: 'text.primary',
                                    '&::after': {
                                        height: '2px',
                                        bgcolor: 'primary.500',
                                    },
                                },
                            },
                        }}
                    >
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                            Workouts
                        </Tab>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                            Routines
                        </Tab>
                        {/* <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                            Sleep
                        </Tab> */}
                    </TabList>
                </Tabs>
            </Box>

            
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                {activeTab === 0 && (
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Search Workouts</Typography>
                            <Typography level="body-sm">
                                Search to add to your routines! Search by any keyword (chest, abs, lat, cable, dumbbell, etc...)
                            </Typography>
                        </Box>
                        <Divider />
    
                        <SearchBar setExercises={setExercises}/>
                        <Exercises exercises={exercises} setExercises={setExercises}/>
                    </Card>
                )}
                {activeTab === 1 && (
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Make Routines</Typography>
                            <Typography level="body-sm">
                                Add exercises to your routine!
                            </Typography>
                        </Box>
                        <Divider />
                        <WorkoutRoutinePage/>
                    </Card>
                )}
                {/* {activeTab === 2 && (
                    <SleepPage/>
                )} */}
                
            </Stack>
        </Box>
    );
}
