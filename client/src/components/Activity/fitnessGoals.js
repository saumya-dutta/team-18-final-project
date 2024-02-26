// fitnessGoal.js

import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Slider } from '@mui/material';
import Container from '@mui/material/Container';



const FitnessGoals = () => {
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');

  const predefinedGoals = ['Weight Loss', 'Muscle Gain', 'Endurance Training', 'Stretch more', 'Run a 5K' , 'Mobility'];

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleCustomGoalChange = (event) => {
    setCustomGoal(event.target.value);
  };

  const handleTargetChange = (event) => {
    setTarget(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic here
    console.log({ goal, customGoal, target, deadline });
    // Reset form or provide feedback to the user
  };






//sitting down duration function
  const [sedentaryHours, setSedentaryHours] = useState(0);

  const handleSedentaryHoursChange = (event, newValue) => {
    setSedentaryHours(newValue);
  };

  // Function to handle saving/editing the sedentary hours log
  const handleSedentaryHoursSubmit = () => {
    console.log(`Sedentary Hours: ${sedentaryHours}`);
    // Add logic to save the sedentary hours to your database or state
  };

return (
  <Container sx={{ paddingX: 20 }}>
  <div sx={{
    maxWidth: 600,
    //margin: 'auto',
    padding: 20,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    borderRadius: 2,
    marginX: 20,
    paddingX: 20
  }}>
    <Typography variant="h4" gutterBottom>
      Set Your Fitness Goals
    </Typography>
    <form onSubmit={handleSubmit} sx={{ marginTop: 4 }}>
      <FormControl fullWidth margin="normal" variant="outlined" sx={{ marginBottom: 3}}>
        <InputLabel id="predefined-goals-label">Predefined Goals</InputLabel>
        <Select
          labelId="predefined-goals-label"
          value={goal}
          label="Predefined Goals"
          onChange={handleGoalChange}
        >
          {predefinedGoals.map((goalOption) => (
            <MenuItem key={goalOption} value={goalOption}>
              {goalOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Custom Goal"
        value={customGoal}
        onChange={handleCustomGoalChange}
        margin="normal"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Target"
        value={target}
        onChange={handleTargetChange}
        margin="normal"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        type="date"
        label="Deadline"
        value={deadline}
        onChange={handleDeadlineChange}
        margin="normal"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
        Save Goals
      </Button>
    </form>

    {/* Section for logging sedentary hours */}
    <Typography variant="h5" gutterBottom sx={{ marginTop: 4, marginBottom: 2 }}>
      Log Sedentary Hours
    </Typography>
    <Typography gutterBottom sx={{ marginBottom: 2 }}>
      Enter the number of hours you've been sitting today:
    </Typography>
    <Slider
      aria-label="Sedentary Hours"
      value={sedentaryHours}
      onChange={handleSedentaryHoursChange}
      valueLabelDisplay="auto"
      step={1}
      marks
      min={0}
      max={24}
      sx={{ marginBottom: 2 }}
    />
    <Button variant="contained" color="primary" onClick={handleSedentaryHoursSubmit} sx={{ width: '100%' }}>
      Save Log
    </Button>
  </div>
  </Container>
);
}

export default FitnessGoals;
