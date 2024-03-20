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

// Endpoint to get all users (just for testing)
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

// Endpoint to add user data
// app.post('/api/signup', (req, res) => {
//   const connection = mysql.createConnection(config);
//   const { email, first_name, last_name, password, country, age } = req.body;
//   const query = 'INSERT INTO `user` (email, first_name, last_name, password, country, age) VALUES (?, ?, ?, ?, ?, ?)';
//   connection.query(query, [email, first_name, last_name, password, country, age], (err, results) => {
//     if (err) {
//       console.error('Error adding user: ' + err.stack);
//       res.status(500).send('Error adding user');
//       return;
//     }
//     res.status(201).send('User added successfully');
//   });
// });


// Endpoint to update user data by user ID
// app.put('/user/:userID', (req, res) => {
//   const connection = mysql.createConnection(config);
//   const userID = req.params.userID;
//   const { email, first_name, last_name, password, country, age } = req.body;
//   const query = 'UPDATE `user` SET email = ?, first_name = ?, last_name = ?, password = ?, country = ?, age = ? WHERE userID = ?';
//   connection.query(query, [email, first_name, last_name, password, country, age, userID], (err, results) => {
//     if (err) {
//       console.error('Error updating user data: ' + err.stack);
//       res.status(500).send('Error updating user data');
//       return;
//     }
//     if (results.affectedRows === 0) {
//       res.status(404).send('User not found');
//       return;
//     }
//     res.send('User data updated successfully');
//   });
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
