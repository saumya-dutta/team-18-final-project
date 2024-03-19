import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/joy/FormControl';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';

import { exerciseOptions, fetchData } from './utils/fetchData.js';
// import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ( {setExercises}
    // { setExercises, bodyPart, setBodyPart }
) => {
    const [search, setSearch] = useState('');
    //   const [bodyParts, setBodyParts] = useState([]);

    //   useEffect(() => {
    //     const fetchExercisesData = async () => {
    //       const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

    //       setBodyParts(['all', ...bodyPartsData]);
    //     };

    //     fetchExercisesData();
    //   }, []);

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

            //   window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

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
        // <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
        //   <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        //     Awesome Exercises You <br /> Should Know
        //   </Typography>
        //   <Box position="relative" mb="72px">
        //     <TextField
        //       height="76px"
        //       sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
        //       value={search}
        //       onChange={(e) => setSearch(e.target.value.toLowerCase())}
        //       placeholder="Search Exercises"
        //       type="text"
        //     />
        //     <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
        //       Search
        //     </Button>
        //   </Box>
        //   <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        //     <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
        //   </Box>
        // </Stack>
    );
};

export default SearchExercises;