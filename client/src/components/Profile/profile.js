import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({
    firstName: '',
    lastName: '',
    preferredName: '',
    userName: '',
    gender: '',
    country: '',
    occupation: '',
  });

  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(profileInfo);
    alert('Profile updated successfully!');
    setShowForm(false); // Hide form after submission
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {!showForm && ( // Show this button only if the form is not displayed
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{ marginBottom: 2 }}>
          Customize Your Profile
        </Button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
        <TextField fullWidth label="First Name" name="firstName" value={profileInfo.firstName} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Last Name" name="lastName" value={profileInfo.lastName} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Preferred Name" name="preferredName" value={profileInfo.preferredName} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="User Name" name="userName" value={profileInfo.userName} onChange={handleChange} margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={profileInfo.gender} onChange={handleChange} label="Gender">
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Country" name="country" value={profileInfo.country} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Occupation" name="occupation" value={profileInfo.occupation} onChange={handleChange} margin="normal" />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Update Profile
        </Button>
      </form>
        
        
      )}
    </Box>
  );
};

export default Profile;

