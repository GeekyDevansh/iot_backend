// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();
const model = require("./schema.js");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_CONNECTION_URL;
const port = process.env.PORT || 8000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection to database eshtablished");
  })
  .catch((err) => {
    console.log(err);
  });

// Create Express application
const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create MySQL connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOSTNAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// Connect to MySQL database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database: ', err);
//     return;
//   }
//   console.log('Connected to MySQL database.');
// });

//Define API routes
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/sensor", (req, res) => {
  const Model = new model({
    value: req.query.pressure,
  });
  console.log(req.query);
  Model.save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).json("Error: " + err));

  // res.send('Hello from the backend!')
});

app.get("/getdata", async (req, res) => {
 await model.find({})
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(400).json("Error: " + err));

  // res.send('Hello from the backend!')
});

// Start server


app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
