// Run the backend server
const express = require('express');
const app = express(); // app is an instance of express
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const listRoutes = require("./routes/listRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
// passport config
const passport = require("passport");
// Passport config
require("./config/passport")(passport); // associated to module.exports = passport => { ... } in the passport.js, this is defined in the node.js CommonJS module system
app.use(cors()); // crossed original request --> google.com, http://localhost:3000/
//allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
app.use(bodyParser.json()); // parse all the requested http to json --> res.body, res.params. bodyParser is a middleware
// Passport middleware
app.use(passport.initialize());

// connect to mongodb
// DB Config
const db = require("./config/key").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    // configurations, options
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  }

// Routes
// we do not consider anything related to session, only consider with specified 'jwt' strategy for authentication
// both list and item need to be authenticated
app.use('/list', passport.authenticate('jwt', { session: false }), listRoutes); // use and listen are methods of Express,
app.use('/item', passport.authenticate('jwt', { session: false }), itemRoutes); // session refers to a visitor's time browsing a web site, the time between a visitor's first arrival at a page on the site and the time they stop using the site. Bad user experience if the use try to come back to the website after he left.
app.use('/user', userRoutes);

// listen to the PORT of 4000
app.listen(process.env.PORT || PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
