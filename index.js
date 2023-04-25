// Import the mysql2 package
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Retrieve data from the database
connection.query('SELECT * FROM mytable', (err, results, fields) => {
  if (err) {
    console.error('Error retrieving data from the database: ' + err.stack);
    return;
  }
  console.log('Data retrieved from the database:');
  console.log(results);
});

// Close the connection
connection.end((err) => {
  if (err) {
    console.error('Error closing the database connection: ' + err.stack);
    return;
  }
  console.log('Connection closed.');
});
