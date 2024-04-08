import React, { useState, useEffect } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WorkoutPage() {
  const [workouts, setWorkouts] = useState([]);
  const [openAddWorkoutModal, setOpenAddWorkoutModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  const serverURL = ""; 

  useEffect(() => {
    const email = 'okay@okay.com'; 
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
      
      var parsed = JSON.parse(res.express);
      console.log("callApiGetWorkouts parsed: ", parsed);
      const workoutsData = parsed.map(workout => ({
        ...workout,
        name: workout.workout_title, 
        exercises: JSON.parse(workout.exercises) 
      }));
      setWorkouts(workoutsData);
      
      console.log("callApiGetWorkouts setWorkouts: ", workouts);
      

      
      
    } catch (error) {
      console.error("Failed to load workouts:", error.message);
    }
  };

  
  const handleAddWorkout = async () => {
    const url = `${serverURL}/api/workout/add`
    if (workoutName.trim() !== '') {
      try {
        
        const email = 'okay@okay.com';
        const response = await fetch(url, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: workoutName, 
            email: email,
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to add new workout');
        }
  
        
        await loadWorkouts({ email });
        console.log('New workout added successfully');
        toast.success('Workout added successfully!');

  
        
        setWorkoutName('');
        setOpenAddWorkoutModal(false);
      } catch (error) {
        console.error("Failed to add new workout:", error.message);
      }
    }
  };

  const handleDeleteWorkout = async (workoutID) => {
    const url = `${serverURL}/api/workout/delete`;
    console.log(workoutID);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workoutID })
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete exercise');
      }
  
    
      
      console.log('Exercise deleted successfully');
      toast.success('Workout deleted successfully!');
      loadWorkouts( {email: 'okay@okay.com'} );
    } catch (error) {
      console.error("Failed to delete exercise:", error.message);
    }
  };



  const handleOpenDetailsModal = (index) => {
    setSelectedWorkoutIndex(index);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedWorkoutIndex(null);
  };


  const handleAddExerciseToWorkout = async (exercise) => {
    try {
      const response = await fetch(`${serverURL}/api/exercise/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: 'okay@okay.com', 
          workoutID: exercise.workoutID,
          exerciseName: exercise.name,
          weight: exercise.weight,
          reps: exercise.reps,
          sets: exercise.sets
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add new exercise');
      }
  
      
      console.log('New exercise added successfully');
      toast.success('Exercise added successfully!');
      await loadWorkouts({ email: 'okay@okay.com' });
    } catch (error) {
      console.error("Failed to add new exercise:", error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button variant="contained" onClick={() => setOpenAddWorkoutModal(true)}>Add Workout</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workout Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.map((workout, index) => (
              <TableRow key={index}>
                {}
                <TableCell>
                  <Button onClick={() => handleOpenDetailsModal(index)}>{workout.name}</Button>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteWorkout(workout.workoutID)}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddWorkoutModal(false)}>Cancel</Button>
          <Button 
          onClick={handleAddWorkout}
          variant="contained" color="primary"
          >Add</Button>
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
    
    onAddExercise({
      name: newExercise.name,
      weight: newExercise.weight,
      reps: newExercise.reps,
      sets: newExercise.sets,
      workoutID: workout.workoutID 
    });
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
                    {}
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
