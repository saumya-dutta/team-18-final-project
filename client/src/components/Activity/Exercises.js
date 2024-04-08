import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from './utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = (
    { exercises, setExercises, 
        
    }
    ) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  useEffect(() => {
    const fetchExerciseData = async () => {
      let exercisesData = [];


        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises?limit=900`,
          exerciseOptions
        );
        console.log(exercisesData);
    

      setExercises(exercisesData);
    };

    fetchExerciseData();
  }, [
    
    setExercises]);

  useEffect(() => {
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(
      indexOfFirstExercise,
      indexOfLastExercise
    );

    setCurrentExercises(currentExercises);
  }, [currentPage, exercises]);

  const [currentExercises, setCurrentExercises] = useState([]);

  const Paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  return (
    <Box
      id="exercises"

    >
      {}
      <Stack
        direction="row"
        
        spacing={1}
        flexWrap="wrap"
        
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>
      <Stack 

      >
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={Paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;