import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [routines, setRoutines] = useState([]);
  const [newRoutineName, setNewRoutineName] = useState('');
  const [newExerciseName, setNewExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(null);

  const handleAddRoutine = () => {
    if (newRoutineName.trim() !== '') {
      setRoutines([...routines, { name: newRoutineName, exercises: [] }]);
      setNewRoutineName('');
    }
  };

  const handleAddExercise = () => {
    if (selectedRoutineIndex !== null && newExerciseName.trim() !== '') {
      const updatedRoutines = [...routines];
      updatedRoutines[selectedRoutineIndex].exercises.push({
        name: newExerciseName,
        weight,
        reps,
        sets,
      });
      setRoutines(updatedRoutines);
      setNewExerciseName('');
      setWeight('');
      setReps('');
      setSets('');
    }
  };

  const handleDeleteRoutine = (index) => {
    const updatedRoutines = [...routines];
    updatedRoutines.splice(index, 1);
    setRoutines(updatedRoutines);
  };

  const handleDeleteExercise = (routineIndex, exerciseIndex) => {
    const updatedRoutines = [...routines];
    updatedRoutines[routineIndex].exercises.splice(exerciseIndex, 1);
    setRoutines(updatedRoutines);
  };

  return (
    <div style={{ padding: 20 }}>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <TextField
          label="Routine Name"
          value={newRoutineName}
          onChange={(e) => setNewRoutineName(e.target.value)}
          variant="outlined"
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" onClick={handleAddRoutine}>
          Add Routine
        </Button>
      </Paper>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 20 }}>
          <Typography variant="h6" gutterBottom>
            Routines
          </Typography>
          <List>
            {routines.map((routine, index) => (
              <ListItem
                key={index}
                button
                selected={selectedRoutineIndex === index}
                onClick={() => setSelectedRoutineIndex(index)}
              >
                <ListItemText primary={routine.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDeleteRoutine(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
        {selectedRoutineIndex !== null && (
          <div>
            <Typography variant="h6" gutterBottom>
              Exercises
            </Typography>
            <List>
              {routines[selectedRoutineIndex].exercises.map((exercise, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${exercise.name} - Weight: ${exercise.weight}, Reps: ${exercise.reps}, Sets: ${exercise.sets}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteExercise(selectedRoutineIndex, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <TextField
              label="Exercise Name"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              variant="outlined"
              style={{ marginRight: 10 }}
            />
            <FormControl variant="outlined" style={{ marginRight: 10 }}>
              <InputLabel>Weight</InputLabel>
              <Select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                label="Weight"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={5}>5 lbs</MenuItem>
                <MenuItem value={10}>10 lbs</MenuItem>
                <MenuItem value={15}>15 lbs</MenuItem>
                {/* Add more weight options as needed */}
              </Select>
            </FormControl>
            <TextField
              label="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              variant="outlined"
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              variant="outlined"
              style={{ marginRight: 10 }}
            />
            <Button variant="contained" onClick={handleAddExercise}>
              Add Exercise
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



