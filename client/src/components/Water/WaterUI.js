import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Button, CircularProgress, Card, CardMedia, LinearProgress } from '@mui/material';

const WaterTrackerUI = () => {
    const [intake, setIntake] = useState(0);
    const goal = 3000; // Hardcoded goal of 3 liters
    const progress = (intake / goal) * 100;

    // Generate fake past week's intake records
    const pastWeekIntake = [2500, 3000, 2800, 3100, 2900, 2700, 3200];

    const addIntake = (amount) => {
        setIntake(intake + amount);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
                {/* Upper Half with Wallpaper */}
                <Grid item xs={12} sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1588250674913-e28f0351f855?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZHJpbmtpbmclMjB3YXRlcnxlbnwwfHwwfHx8MA%3D%3D)',
                    backgroundSize: 'cover',
                    filter: 'brightness(100%)',
                    color: '#FFFFFF', // Set text color to pure white
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant="h3" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        Daily Water Intake
                    </Typography>
                    <Box>
                        {[100, 330, 500, 1000].map((amount) => (
                            <Button key={amount} variant="contained" onClick={() => addIntake(amount)} sx={{
                                margin: 1,
                                backgroundColor: 'aqua',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'darkturquoise',
                                },
                            }}>
                                {amount}ml
                            </Button>
                        ))}
                    </Box>
                    <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        Goal: 3 Liters
                    </Typography>
                    <CircularProgress variant="determinate" value={progress} size={100} thickness={4} sx={{ color: 'aqua', mt: 2 }} />
                    <Typography variant="h6" sx={{ mt: 2, color: '#FFFFFF', fontWeight: 'bold' }}>
                        {Math.round(progress)}% Achieved
                    </Typography>
                </Grid>
                {/* Lower Left Quarter - Past Week's Intake */}
                <Grid item xs={6} sx={{ height: '50vh', overflow: 'auto', p: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#000000' }}>
                        Past Week's Intake
                    </Typography>
                    {pastWeekIntake.map((intake, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography sx={{ minWidth: 70, fontWeight: 'bold', fontSize: '1.1rem', color: '#000000' }}>Day {index + 1}:</Typography>
                            <LinearProgress variant="determinate" value={(intake / goal) * 100} sx={{ flexGrow: 1, mr: 1, height: 10, borderRadius: 5 }} />
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#000000' }}>{intake}ml</Typography>
                        </Box>
                    ))}
                </Grid>
                {/* Lower Right Quarter - Hydration Motivation */}
                <Grid item xs={6} sx={{ height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#000000' }}>
                        Hydration Motivation
                    </Typography>
                    <Card sx={{ width: '100%', height: '100%' }}>
                        <CardMedia
                            component="iframe"
                            sx={{ height: '100%', width: '100%' }}
                            src="https://www.youtube.com/embed/9iMGFqMmUFs"
                            title="Motivational Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default WaterTrackerUI;