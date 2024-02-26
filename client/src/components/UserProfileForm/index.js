import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, Grid, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';




const CustomTextField = ({ name, label, type, value, onChange }) => (
  <TextField
    required
    name={name}
    label={label}
    type={type || 'text'}
    value={value}
    onChange={onChange}
    variant="outlined"
    fullWidth
    margin="normal"
  />
);

function UserProfileForm() {
  const theme = useTheme(); 
  const [profile, setProfile] = useState({
    gender: '',
    weight: '',
    height: '',
    age: '',
    sleep: '',
    waterIntake: '',
    dietaryRestrictions: '',
    otherDietaryRestrictions: '',
    goal: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Profile Data:', profile);
   
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        Your Information 
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <Select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Gender' }}
            >
              <MenuItem value="" disabled>Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField name="weight" label="Weight (kg)" type="number" value={profile.weight} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField name="height" label="Height (cm)" type="number" value={profile.height} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField name="age" label="Age" type="number" value={profile.age} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField name="sleep" label="Average Hours of Sleep" type="number" value={profile.sleep} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField name="waterIntake" label="Average Water Intake (liters)" type="number" value={profile.waterIntake} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth margin="normal">
  <InputLabel id="dietary-restrictions-label">
    Dietary Restrictions
  </InputLabel>
  <Select
    labelId="dietary-restrictions-label"
      id="dietaryRestrictions"
      name="dietaryRestrictions"
      value={profile.dietaryRestrictions}
      onChange={handleChange}
      displayEmpty
    >
      <MenuItem value=""><em>None</em></MenuItem>
      <MenuItem value="Vegetarian">Vegetarian</MenuItem>
      <MenuItem value="Vegan">Vegan</MenuItem>
      <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
      <MenuItem value="Kosher">Kosher</MenuItem>
      <MenuItem value="Halal">Halal</MenuItem>
      <MenuItem value="No Dairy">No Dairy</MenuItem>
      <MenuItem value="Other">Other</MenuItem>
    </Select>
  </FormControl>
</Grid>
{profile.dietaryRestrictions === 'Other' && (
  <Grid item xs={12}>
    <CustomTextField
      name="otherDietaryRestrictions"
      label="Other Dietary Restrictions"
      type="text"
      value={profile.otherDietaryRestrictions}
      onChange={handleChange}
    />
  </Grid>
)}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <Select
              name="goal"
              value={profile.goal}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Goal' }}
            >
              <MenuItem value="" disabled>Goal</MenuItem>
              <MenuItem value="gain muscle">Gain Muscle</MenuItem>
              <MenuItem value="lose fat">Lose Fat</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfileForm;