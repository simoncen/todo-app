const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

// connect to mongodb
// DB Config
const db = require("./config/key").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
