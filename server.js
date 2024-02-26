const express = require('express');
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
