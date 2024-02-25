import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const FitnessGoal = () => {
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const predefinedGoals = ['Weight Loss', 'Muscle Gain', 'Endurance Training'];

  const handleSaveGoal = () => {
    // Logic to save the goal goes here
    // For now, just logging to the console
    console.log('Selected Predefined Goal:', goal);
    console.log('Custom Goal:', customGoal);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Enter Your Fitness Goals</h2>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="predefined-goal-label">Predefined Goals</InputLabel>
        <Select
          labelId="predefined-goal-label"
          value={goal}
          label="Predefined Goals"
          onChange={(e) => setGoal(e.target.value)}
        >
          {predefinedGoals.map((g) => (
            <MenuItem key={g} value={g}>{g}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Custom Goal"
        variant="outlined"
        fullWidth
        value={customGoal}
        onChange={(e) => setCustomGoal(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSaveGoal}>
        Save Goal
      </Button>
    </div>
  );
};

export default FitnessGoal;
