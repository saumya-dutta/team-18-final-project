import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Typography,
  Card,
  Divider,
  List,
  ListItem,
} from '@mui/material'; // Adjusted imports for MUI components
import SearchIcon from '@mui/icons-material/Search';

export default function FoodUI() {
  const [mealName, setMealName] = useState('');
  const [currentMeal, setCurrentMeal] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mealHistory, setMealHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const addMeal = () => {
    if (!mealName.trim() || currentMeal.length === 0) {
      alert('Please enter a meal name and add at least one food item.');
      return;
    }
    setMealHistory(prev => [...prev, { mealName, foods: [...currentMeal] }]);
    setMealName('');
    setCurrentMeal([]);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query.');
      return;
    }
    setLoading(true);
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const url = `https://api.spoonacular.com/food/menuItems/search?query=${searchQuery}&number=10&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      setSearchResults(response.data.menuItems || []);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      alert('Failed to fetch menu items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addFoodToMeal = menuItem => {
    setCurrentMeal(prev => [...prev, menuItem]);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Create a Meal</Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <FormLabel>Meal Name</FormLabel>
        <Input
          fullWidth
          value={mealName}
          onChange={e => setMealName(e.target.value)}
          placeholder="Enter meal name"
        />
        <Button variant="contained" onClick={addMeal} sx={{ mt: 2 }}>
          Save Meal
        </Button>
      </FormControl>

      <Typography variant="h5" sx={{ mb: 2 }}>Search for Menu Items</Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
        <Input
          fullWidth
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search menu items"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button
          variant="outlined"
          onClick={handleSearch}
          disabled={loading}
          startIcon={<SearchIcon />}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Box>
      <List>
        {searchResults.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Button onClick={() => addFoodToMeal(item)}>Add to Meal</Button>
            }
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.image} alt={item.title} style={{ width: 50, height: 50, marginRight: 2 }} />
              <Box>
                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="body2">{item.restaurantChain}</Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5">Current Meal Foods</Typography>
      <List dense>
        {currentMeal.map((item, index) => (
          <ListItem key={index}>
            <Typography>{item.title} - {item.restaurantChain}</Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5">Meal History</Typography>
      <List dense>
        {mealHistory.map((meal, index) => (
          <ListItem key={index} sx={{ mt: 2 }}>
            <Typography variant="h6">{meal.mealName}</Typography>
            {meal.foods.map((food, fIndex) => (
              <Typography key={fIndex} sx={{ ml: 4 }}>{food.title} - {food.restaurantChain}</Typography>
            ))}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
