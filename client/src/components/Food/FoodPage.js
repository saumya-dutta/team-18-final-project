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


const columns = ['Breakfast', 'Lunch', 'Dinner'];

// function TableInput() {
//     return (
//         <TableCell align="right">
//             <Stack spacing={2}>
//                 <div>
//                     <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
//                     <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
//                     <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
//                 </div>

//             </Stack>
//         </TableCell>
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
                        {columns.map((cols, index) => (
                            <TableRow
                                key={cols}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {cols}
                                </TableCell>

                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                            <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
                                        </div>

                                    </Stack>
                                </TableCell>

                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                            <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
                                        </div>

                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                            <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
                                        </div>

                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                            <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
                                        </div>

                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                            <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
                                        </div>

                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                            <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
                                        </div>

                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack spacing={2}>
                                        <div>
                                            <TextField id="filled-basic" label="Carbs(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Fats(g)" variant="filled" size="small" style={{ width: 100 }} />
                                            <TextField id="filled-basic" label="Proteins(g)" variant="filled" size="small" style={{ width: 100 }} />
                                        </div>

                                    </Stack>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <button>Clear</button>
        </div>

    );
}