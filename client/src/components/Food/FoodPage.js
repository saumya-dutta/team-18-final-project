import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';



function createData(name, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
    return { name, monday, tuesday, wednesday, thursday, friday, saturday, sunday };
}

const rows = [
    createData('Breakfast', 159, 6.0, 24, 4.0, 1, 1, 1),
    createData('Lunch', 237, 9.0, 37, 4.3, 1, 1, 1),
    createData('Dinner', 262, 16.0, 24, 6.01, 1, 1, 1),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// function TableInput() {
//     return (
//         <div>
//             <input> add </input>
//         </div>
//     )
// }
export default function FoodTable() {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">Monday</TableCell>
                            <TableCell align="right">Tuesday</TableCell>
                            <TableCell align="right">Wednesday</TableCell>
                            <TableCell align="right">Thursday</TableCell>
                            <TableCell align="right">Friday</TableCell>
                            <TableCell align="right">Saturday</TableCell>
                            <TableCell align="right">Sunday</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                        {/* <input name="carb"></input>
                                        <input name="fats"></input>
                                        <input name="proteins"></input> */}
                                        <TextField id="filled-basic" label="Carbs" variant="filled" size="small" style={{ marginBottom: '10px' }}/>
                                        <TextField id="filled-basic" label="Fats" variant="filled" size="small" style={{ marginBottom: '10px' }}/>
                                        <TextField id="filled-basic" label="Proteins" variant="filled" size="small" style={{ marginBottom: '10px' }}/>
                                        </div>

                                    </Stack>
                                    {/* <TextField id="filled-basic" label="Carbs" variant="filled" size="small" style={{ marginBottom: '10px' }}/>
                                    <TextField id="filled-basic" label="Fats" variant="filled" size="small" style={{ marginBottom: '10px' }}/> */}
                                    {/* <button>test </button> */}
                                </TableCell>
                                <TableCell align="right"><button>test </button></TableCell>
                                <TableCell align="right"><button>test </button></TableCell>
                                <TableCell align="right"><button>test </button></TableCell>
                                <TableCell align="right"><button>test </button></TableCell>
                                <TableCell align="right"><button>test </button></TableCell>
                                <TableCell align="right"><button>test </button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button>Clear</button>
        </div>

    );
}