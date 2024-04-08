import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardMedia, CardContent, Grid, Modal, TextField, Paper, Typography, ButtonGroup, Stepper, Step, StepLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';

export default function FoodUI() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealHistory, setMealHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [mealType, setMealType] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Start', 'Choose Meal Type', 'Select Foods', 'Save Meal']; // Steps for the Stepper
  const mealTypes = ['Snack', 'Breakfast', 'Lunch', 'Dinner'];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      setSearchResults(response.data.meals || []);
      toast.success('Search completed!');
    } catch (error) {
      console.error("Error fetching meals:", error);
      toast.error(`Failed to fetch meals: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addFoodToSelection = (meal) => {
    setSelectedFoods(prevFoods => {
      if (prevFoods.find(f => f.idMeal === meal.idMeal)) {
        toast.info('This food is already added.');
        return prevFoods;
      }
      return [...prevFoods, meal];
    });
    toast.success('Food added to meal!');
  };

  const saveMeal = () => {
    if (!mealName.trim()) {
      toast.error('Please provide a name for your meal.');
      return;
    }
    // Include the first image from selected foods as the meal image
    const mealImage = selectedFoods.length > 0 ? selectedFoods[0].strMealThumb : '';
    setMealHistory(prevHistory => [...prevHistory, { name: mealName, type: mealType, foods: selectedFoods, image: mealImage }]);
    setShowMealModal(false);
    setSelectedFoods([]);
    setMealName('');
    setCurrentStep(0);
    toast.success('Meal saved successfully!');
  };

  const handleMealTypeSelection = (type) => {
    setMealType(type);
    setCurrentStep(2);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" onClick={() => setCurrentStep(1)}>Design My Meal</Button>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              {mealTypes.map((type) => (
                <Button key={type} onClick={() => handleMealTypeSelection(type)}>{type}</Button>
              ))}
            </ButtonGroup>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for foods"
                onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
                variant="outlined"
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                startIcon={<SearchIcon />}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Box>
            <Grid container spacing={2}>
              {searchResults.map((meal, index) => (
                <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
                  <Card sx={{ maxWidth: 345, m: 2 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={meal.strMealThumb}
                      alt={meal.strMeal}
                    />
                    <CardContent>
                      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                        {meal.strMeal}
                      </Paper>
                      <Button size="small" onClick={() => addFoodToSelection(meal)}>Add to Meal</Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {selectedFoods.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setShowMealModal(true)}
              >
                Finish & Save Meal
              </Button>
            )}
          </Box>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <ToastContainer />
      {renderStepContent(currentStep)}
      <Modal
        open={showMealModal}
        onClose={() => setShowMealModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none'
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Save Your Meal
          </Typography>
          <TextField
            fullWidth
            label="Meal Name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            margin="normal"
          />
          <Button onClick={saveMeal} color="primary" variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
      <Box sx={{ mt: 4, pt: 4, pb: 4, bgcolor: 'rgba(0, 0, 0, 0.7)', borderRadius: 2 }}>
        <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1, boxShadow: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ color: 'black', fontWeight: 'bold' }}>
            Meal History
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="flex-start">
          {mealHistory.map((meal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, m: 2, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={meal.image || 'path/to/default/image.jpg'} // Provide a default image path if meal.image is empty
                  alt={meal.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                    {meal.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'left' }}>
                    Type: {meal.type}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {meal.foods.map((food, foodIndex) => (
                      <Typography key={foodIndex} variant="body2" color="textSecondary" sx={{ mb: 0.5, textAlign: 'left' }}>
                        {food.strMeal}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
