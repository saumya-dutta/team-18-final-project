// fitnessGoal.js

import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';

const FitnessGoals = () => {
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');

  const predefinedGoals = ['Weight Loss', 'Muscle Gain', 'Endurance Training'];

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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Set Your Fitness Goals
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
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
        />
        <TextField
          fullWidth
          label="Target"
          value={target}
          onChange={handleTargetChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          label="Deadline"
          value={deadline}
          onChange={handleDeadlineChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Save Goals
        </Button>
      </form>
    </div>
  );
};

export default FitnessGoals;
