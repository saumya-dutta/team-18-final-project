import React, { useState, useEffect } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function WorkoutPage() {
  const [workouts, setWorkouts] = useState([]);
  const [openAddWorkoutModal, setOpenAddWorkoutModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  const serverURL = ""; // Replace with your actual server URL

  useEffect(() => {
    const email = 'okay@okay.com'; // Replace with the actual email or logic to retrieve it
    loadWorkouts({ email });
  }, []);

  const callApiGetWorkouts = async (email) => {
    const url = `${serverURL}/api/user/workouts/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user workouts');
      }

      const body = await response.json();
      return body;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const loadWorkouts = async ({ email }) => {
    try {
      const res = await callApiGetWorkouts(email);
      // Assuming the response directly contains the workouts array
      // Adjust this logic based on your actual API response structure
      // console.log("callApiGetWorkouts returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("callApiGetWorkouts parsed: ", parsed);
      const workoutsData = parsed.map(workout => ({
        ...workout,
        name: workout.workout_title, // Map workout_title to name
        exercises: JSON.parse(workout.exercises) // Parse the stringified exercises JSON
      }));
      setWorkouts(workoutsData);
      // parsed.forEach(workout => {
      //   workout.exercises = JSON.parse(workout.exercises);
      // });
      // setWorkouts(parsed || []);
      console.log("callApiGetWorkouts setWorkouts: ", workouts);
      

      // setWorkouts(res.workouts || []);
      // console.log(res.workouts);
    } catch (error) {
      console.error("Failed to load workouts:", error.message);
    }
  };

  const handleAddWorkout = () => {
    if (workoutName.trim() !== '' && exerciseType.trim() !== '') {
      setWorkouts([...workouts, { name: workoutName, type: exerciseType, exercises: [] }]);
      setWorkoutName('');
      setExerciseType('');
      setOpenAddWorkoutModal(false);
    }
  };

  const handleDeleteWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  const handleOpenDetailsModal = (index) => {
    setSelectedWorkoutIndex(index);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedWorkoutIndex(null);
  };

  const handleAddExerciseToWorkout = (exercise) => {
    const updatedWorkouts = [...workouts];
    const currentWorkout = updatedWorkouts[selectedWorkoutIndex];
    if (currentWorkout) {
      currentWorkout.exercises.push(exercise);
      setWorkouts(updatedWorkouts);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpenAddWorkoutModal(true)}>Add Workout</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workout Name</TableCell>
              <TableCell>Exercise Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.map((workout, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button onClick={() => handleOpenDetailsModal(index)}>{workout.name}</Button>
                </TableCell>
                <TableCell>{workout.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteWorkout(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedWorkoutIndex !== null && (
        <WorkoutDetailsModal
          workout={workouts[selectedWorkoutIndex]}
          open={openDetailsModal}
          onClose={handleCloseDetailsModal}
          onAddExercise={handleAddExerciseToWorkout}
        />
      )}
      <Dialog open={openAddWorkoutModal} onClose={() => setOpenAddWorkoutModal(false)}>
        <DialogTitle>Add New Workout</DialogTitle>
        <DialogContent>
          <TextField
            label="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Exercise Type"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddWorkoutModal(false)}>Cancel</Button>
          <Button onClick={handleAddWorkout} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function WorkoutDetailsModal({ workout, open, onClose, onAddExercise }) {
  const [newExercise, setNewExercise] = useState({ name: '', weight: '', reps: '', sets: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExercise(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExercise(newExercise);
    setNewExercise({ name: '', weight: '', reps: '', sets: '' }); // Reset form
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{workout.name} Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Exercises</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Sets</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workout.exercises.map((exercise, idx) => (
                <TableRow key={idx}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.weight}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>
                    {/* Potential future spot for a delete exercise button */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <TextField label="Name" name="name" value={newExercise.name} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Weight" name="weight" value={newExercise.weight} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Reps" name="reps" value={newExercise.reps} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Sets" name="sets" value={newExercise.sets} onChange={handleChange} fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>Add Exercise</Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkoutPage;
