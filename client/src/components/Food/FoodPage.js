import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

export default function FoodTable() {
    const [inputValues, setInputValues] = React.useState(createInitialInputValues());

    function createInitialInputValues() {
        const initialInputValues = {};
        mealTypes.forEach(meal => {
            initialInputValues[meal] = {};
            daysOfWeek.forEach(day => {
                initialInputValues[meal][day] = {
                    Carbs: '',
                    Fats: '',
                    Proteins: '',
                };
            });
        });
        return initialInputValues;
    }

    const handleClear = () => {
        setInputValues(createInitialInputValues());
    };

    const handleInputChange = (meal, day, nutrient, value) => {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [meal]: {
                ...prevInputValues[meal],
                [day]: {
                    ...prevInputValues[meal][day],
                    [nutrient]: value,
                },
            },
        }));
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {daysOfWeek.map(day => (
                                <TableCell key={day} align="right">{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {mealTypes.map(meal => (
                            <TableRow key={meal}>
                                <TableCell component="th" scope="row">
                                    {meal}
                                </TableCell>
                                {daysOfWeek.map(day => (
                                    <TableCell key={`${meal}-${day}`} align="right">
                                        <Stack 
                                        // spacing={2} 
                                        // direction="row"
                                        >
                                            <TextField
                                                id={`${meal}-${day}-carbs`}
                                                label="Carbs(g)"
                                                variant="filled"
                                                size="small"
                                                style={{ width: 100 }}
                                                value={inputValues[meal][day].Carbs}
                                                onChange={e => handleInputChange(meal, day, 'Carbs', e.target.value)}
                                            />
                                            <TextField
                                                id={`${meal}-${day}-fats`}
                                                label="Fats(g)"
                                                variant="filled"
                                                size="small"
                                                style={{ width: 100 }}
                                                value={inputValues[meal][day].Fats}
                                                onChange={e => handleInputChange(meal, day, 'Fats', e.target.value)}
                                            />
                                            <TextField
                                                id={`${meal}-${day}-proteins`}
                                                label="Proteins(g)"
                                                variant="filled"
                                                size="small"
                                                style={{ width: 100 }}
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
            </TableContainer>

            <Button onClick={handleClear} variant="contained" color="primary">Clear</Button>
        </div>
    );
}
