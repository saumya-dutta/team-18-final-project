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
app.get('/api/user', (req, res) => {
  const connection = mysql.createConnection(config);
  // const email = req.body.email;
  const sql = 'SELECT * FROM s39dutta.user';
  connection.query(sql, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
  });
  connection.end();
});


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



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
