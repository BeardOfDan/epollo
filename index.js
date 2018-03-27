const express = require('express');
const app = express();

const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 5000;
const KEYS = require('./config/keys');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    'maxAge': 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    'keys': [KEYS.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(KEYS.mongoURI);

// Mongoose Models
require('./models/User');
require('./models/Story');

// Passport configuration
require('./services/passport');

// // Routes
require('./routes/authRoutes')(app);
require('./routes/generalRoutes')(app);

//This statment tells the server to send any file requested in the lib folder
app.use(express.static(path.join(__dirname, 'epollo')));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} \n`);
});
