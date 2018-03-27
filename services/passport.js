const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const KEYS = require('./../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
  done(null, await User.findById(userID));
});

passport.use(
  new GoogleStrategy(
    {
      'clientID': KEYS.googleClientID,
      'clientSecret': KEYS.googleClientSecret,
      'callbackURL': '/auth/google/callback',
      'proxy': true
    }, async (accessToken, refreshToken, profile, done) => {
      // Users are held to be unique according to their email addresses
      const user = await User.findOne({ 'email': profile.emails[0].value });
      if (user === null) { // new user
        const newUser = await new User({
          'email': profile.emails[0].value,
          'displayName': profile.displayName
        });
        done(null, await newUser.save());
      } else { // existing user
        done(null, user);
      }
    }
  )
);

