import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Header from '../LandingPage/header.js';
import Landing from './landing.js';


export default function HomePage() {
    const plans = [
        {
            title: 'Basic Plan',
            price: '$9.99/month',
            description: 'Supports tracking of food and activity.'
        },
        {
            title: 'Premium Plan',
            price: '$19.99/month',
            description: 'Access to new features such as water intake, sleep, steps count, etc.'
        },
        {
            title: 'Ultimate Plan',
            price: '$29.99/month',
            description: 'Real-time metrics of all features. Suggestions of workouts and recipes based on your past activity.'
        }
    ];

    return (
        <div>
            <Header />
            <Landing/>
            
            <Container>
                <Box my={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Choose Your Plan
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {plans.map((plan, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {plan.title}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            {plan.price}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {plan.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box my={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Features
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Food Tracking
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Log your meals and snacks to keep track of your nutrition intake.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Activity Tracking
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Record your exercises and physical activities to monitor your fitness progress.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Real-time Metrics
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Get instant feedback on your performance and health statistics.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}
