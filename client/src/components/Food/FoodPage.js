import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Stack, Button } from '@mui/material';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

export default function FoodTable() {
    const [inputValues, setInputValues] = useState(createInitialInputValues());

    function createInitialInputValues() {
        return mealTypes.reduce((acc, meal) => ({
            ...acc,
            [meal]: daysOfWeek.reduce((dayAcc, day) => ({
                ...dayAcc,
                [day]: { Carbs: '', Fats: '', Proteins: '' },
            }), {}),
        }), {});
    }

    const handleClear = () => setInputValues(createInitialInputValues());

    const handleInputChange = (meal, day, nutrient, value) => {
        setInputValues(prev => ({
            ...prev,
            [meal]: {
                ...prev[meal],
                [day]: {
                    ...prev[meal][day],
                    [nutrient]: value,
                },
            },
        }));
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="nutrition table">
                <TableHead>
                    <TableRow>
                        <TableCell>Meal / Day</TableCell>
                        {daysOfWeek.map(day => (
                            <TableCell key={day} align="center">{day}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mealTypes.map(meal => (
                        <TableRow key={meal}>
                            <TableCell component="th" scope="row">{meal}</TableCell>
                            {daysOfWeek.map(day => (
                                <TableCell key={`${meal}-${day}`} align="center">
                                    <Stack direction="row" spacing={1} justifyContent="center">
                                        <TextField
                                            id={`${meal}-${day}-carbs`}
                                            label="Carbs(g)"
                                            variant="outlined"
                                            size="small"
                                            value={inputValues[meal][day].Carbs}
                                            onChange={e => handleInputChange(meal, day, 'Carbs', e.target.value)}
                                        />
                                        <TextField
                                            id={`${meal}-${day}-fats`}
                                            label="Fats(g)"
                                            variant="outlined"
                                            size="small"
                                            value={inputValues[meal][day].Fats}
                                            onChange={e => handleInputChange(meal, day, 'Fats', e.target.value)}
                                        />
                                        <TextField
                                            id={`${meal}-${day}-proteins`}
                                            label="Proteins(g)"
                                            variant="outlined"
                                            size="small"
                                            value={inputValues[meal][day].Proteins}
                                            onChange={e => handleInputChange(meal, day, 'Proteins', e.target.value)}
                                        />
                                    </Stack>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={handleClear} variant="contained" color="primary" sx={{ m: 2 }}>Clear</Button>
        </TableContainer>
    );
}