const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configure allowed origins
const corsOptions = {
  origin: "http://localhost:8080" 
  //allow requests from the specified origin (http://localhost:8081)
};

// Apply CORS with the specified options
app.use(cors(corsOptions));

// set port, 
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8081;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user.routes")(app)
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
    //listen for requests
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to user fullstack application." });
});



//log request
app.use(morgan('tiny'));
