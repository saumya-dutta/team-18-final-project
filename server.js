const express = require('express');
// import express from 'express';
const request = require('request');

const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool connection
const pool = new Pool({
  connectionString: 'Your_Database_Connection_String_Here',
  ssl: {
    rejectUnauthorized: false
  }
});

// Test API endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to add a fitness goal
app.post('/addFitnessGoal', async (req, res) => {
  try {
    const { userId, goal, target, deadline } = req.body;
    const newGoal = await pool.query(
      'INSERT INTO fitness_goals (user_id, goal, target, deadline) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, goal, target, deadline]
    );
    res.json(newGoal.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to update profile information
app.post('/updateProfile', async (req, res) => {
  try {
    const { userId, firstName, lastName, preferredName, userName, gender, country, occupation } = req.body;
    const updatedProfile = await pool.query(
      'UPDATE user_profiles SET first_name = $2, last_name = $3, preferred_name = $4, user_name = $5, gender = $6, country = $7, occupation = $8 WHERE user_id = $1 RETURNING *',
      [userId, firstName, lastName, preferredName, userName, gender, country, occupation]
    );
    res.json(updatedProfile.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Excercises API
// const apiKey = 'YOUR_API_KEY'; // replace this with your actual API key

// app.get('/exercises', (req, res) => {
//   const muscle = req.query.muscle || 'biceps'; // default muscle to 'biceps' if not provided

//   request.get({
//     url: 'https://api.api-ninjas.com/v1/exercises',
//     qs: { muscle }, // Query string parameters
//     headers: {
//       'X-Api-Key': apiKey
//     },
//   }, (error, response, body) => {
//     if (error) {
//       console.error('Request failed:', error);
//       res.status(500).send('Internal Server Error');
//     } else if (response.statusCode !== 200) {
//       console.error('Error:', response.statusCode, body.toString('utf8'));
//       res.status(response.statusCode).send(body.toString('utf8'));
//     } else {
//       res.send(body); // Send the response body to the client
//     }
//   });
// });

app.get('/exercises', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    params: { limit: '10' },
    headers: {
      'X-RapidAPI-Key': '77c9d21713msh2c391af7138989dp1ed369jsn980aaa71da2c',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
