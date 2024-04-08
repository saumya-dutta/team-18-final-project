import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/joy/FormControl';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';

import { exerciseOptions, fetchData } from './utils/fetchData.js';


const SearchExercises = ( {setExercises}

) => {
    const [search, setSearch] = useState('');


    const handleSearch = async () => {
        if (search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=900', exerciseOptions);

            const searchedExercises = exercisesData.filter(
                (item) => item.name.toLowerCase().includes(search)
                    || item.target.toLowerCase().includes(search)
                    || item.equipment.toLowerCase().includes(search)
                    || item.bodyPart.toLowerCase().includes(search),
            );
            console.log(searchedExercises);

         

            setSearch('');
            setExercises(searchedExercises);
        }
    };

    return (
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            <FormControl>
                <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
                    <Input size="sm" 
                    value={search} 
                    placeholder="Search Exercises" 
                    onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                    <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                        <SearchIcon style={{ fill: "orange" }} />
                    </IconButton>
                </Stack>
            </FormControl>
        </Stack>

    );
};

export default SearchExercises;