import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';
import cors from "cors";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
}
);

// Endpoint to get user data by email
app.post('/api/user/email', (req, res) => {
  let connection = mysql.createConnection(config);
  const email = req.body.email;
  const sql = 'SELECT * from s39dutta.user where email = ?';
  connection.query(sql, [email], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Loading User Result", results);
    console.log(results);
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

// Endpoint to get all users (just for testing // cleanup b4 submission!)
// app.get('/api/user', (req, res) => {
//   const connection = mysql.createConnection(config);
//   // const email = req.body.email;
//   const sql = 'SELECT * FROM s39dutta.user';
//   connection.query(sql, (err, results, fields) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     // console.log(results);
// 		let string = JSON.stringify(results);
// 		let obj = JSON.parse(string);
// 		res.send({ express: string });
//   });
//   connection.end();
// });


// Endpoint to update user data
app.put('/api/user/update', (req, res) => {
  const connection = mysql.createConnection(config);
  const { userID, weight, height } = req.body;
  const query = 'UPDATE s39dutta.user SET weight = ?, height = ? WHERE userID = ?';
  connection.query(query, [weight, height, userID], (err, results) => {
    if (err) {
      console.error('Error updating user data:', err);
      res.status(500).send('Error updating user data');
      return;
    }
    console.log('User data updated successfully');
    res.sendStatus(200);
  });
});

// Endpoint to update user goals
app.put('/api/user/goals/update', (req, res) => {
  const connection = mysql.createConnection(config);
  const { userID, goal, goal_description } = req.body;
  const query = 'UPDATE s39dutta.user SET goal = ?, goal_description = ? WHERE userID = ?';
  connection.query(query, [goal, goal_description, userID], (err, results) => {
    if (err) {
      console.error('Error updating user data:', err);
      res.status(500).send('Error updating user data');
      return;
    }
    console.log('User data updated successfully');
    res.sendStatus(200);
  });
});

// Endpoint to get user plan
app.post('/api/user/plan', (req, res) => {
  let connection = mysql.createConnection(config);
  const email = req.body.email;
  const sql = 'SELECT plan from s39dutta.user where email = ?';
  connection.query(sql, [email], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Loading User Result", results);
    console.log(results);
    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

// endpoint to get user's workouts and exercises
app.post('/api/user/workouts/', (req, res) => {
  let connection = mysql.createConnection(config);
  const email = req.body.email;

  // SQL query to retrieve workouts and exercises concatenated into one column
  const sql = `
  SELECT w.title AS workout_title,
  JSON_ARRAYAGG(JSON_OBJECT('name', e.exerciseName, 'weight', e.weight, 'reps', e.reps, 'sets', e.sets)) AS exercises,
  w.workoutID
  FROM s39dutta.user u
  JOIN s39dutta.workouts w ON u.userID = w.userID
  LEFT JOIN s39dutta.exercises e ON w.workoutID = e.workoutID
  WHERE u.email = ?
  GROUP BY w.workoutID;
  `;

  // Execute the SQL query
  connection.query(sql, [email], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }

    console.log(results);

    let string = JSON.stringify(results);
    let obj = JSON.parse(string);
    res.send({ express: string });

    
  });
  connection.end();
});

// Endpoint to delete a workout and its associated exercises using a PUT request (does not work)
app.delete('/api/workout/delete', (req, res) => {
  const connection = mysql.createConnection(config);
  const workoutID = req.body.workoutID;

  const deleteQuery = `
    DELETE workouts, exercises
    FROM workouts
    LEFT JOIN exercises ON workouts.workoutID = exercises.workoutID
    WHERE workouts.workoutID = ?
  `;

  connection.query(deleteQuery, [workoutID], (err, results) => {
    if (err) {
      console.error('Error deleting workout and exercises:', err);
      res.status(500).send('Error deleting workout and exercises');
      return;
    }

    console.log('Workout and associated exercises deleted successfully');
    res.sendStatus(200);
  });

  connection.end();
});

//endpoint to add a new workout
app.put('/api/workout/add', (req, res) => {
  const { title, email } = req.body;
  const query = `
    INSERT INTO s39dutta.workouts (title, userID)
    SELECT ?, userID
    FROM s39dutta.user
    WHERE email = ?
  `;

  const connection = mysql.createConnection(config);

  connection.query(query, [title, email], (err, results) => {
    if (err) {
      console.error('Error adding workout:', err);
      res.status(500).json({ error: 'Error adding workout' });
      connection.end();
      return;
    }

    console.log('Workout added successfully');
    res.status(201).json({ message: 'good' });
    connection.end();
  });
});

// endpoint to add exercises to the database
app.put('/api/exercise/add', (req, res) => {
  const { email, workoutID, exerciseName, weight, reps, sets } = req.body;

  // Validate required fields
  if (!email || !workoutID || !exerciseName ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const connection = mysql.createConnection(config);

  // Query to insert exercise
  const query = `
    INSERT INTO s39dutta.exercises (workoutID, exerciseName, weight, reps, sets)
    VALUES (
      (SELECT workoutID FROM s39dutta.workouts WHERE userID = (SELECT userID FROM s39dutta.user WHERE email = ?) AND workoutID = ?), 
      ?, ?, ?, ?
    )
  `;

  connection.query(query, [email, workoutID, exerciseName, weight, reps, sets], (err, results) => {
    if (err) {
      console.error('Error adding exercise:', err);
      res.status(500).json({ error: 'Error adding exercise' });
      connection.end();
      return;
    }

    console.log('Exercise added successfully');
    res.status(201).json({ exerciseID: results.insertId });
    connection.end();
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
