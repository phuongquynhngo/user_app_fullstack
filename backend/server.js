const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configure allowed origins
var corsOptions = {
  origin: "http://localhost:8081" 
  //allow requests from the specified origin (http://localhost:8081)
};

// Apply CORS with the specified options
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to user fullstack application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});