import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Stack } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <img src={exercise.gifUrl} alt="exercise.name" loading='lazy' />
            
            <CardContent>
                <Typography variant="h8" component="div">
                    {exercise.name}
                </Typography>
                <Button sx={{ ml: '15px', color: '#fff', background: '#ffa929', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>{exercise.bodyPart}</Button>
                <Button sx={{ ml: '15px', color: '#fff', background: '#fdaaaa', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>{exercise.target}</Button>
                <Typography variant="body2" color="text.secondary">
                    Equipment: {exercise.equipment}
                </Typography>
                {}
                <Typography variant="body2" color="text.secondary">
                    Instructions:
                    <ul>
                        {exercise.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                </Typography>
                {}
            </CardContent>
            
        </Card>
    );
};

export default ExerciseCard;
