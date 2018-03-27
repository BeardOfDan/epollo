const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google', // This is route that a user goes to to get logged in
    passport.authenticate('google', { // Get Authentication Code from Google
      'scope': ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google'), // Utilize Google's Authenication Code
    (req, res, next) => {
      res.redirect('/home'); // This is the path that the newly logged in user is sent to
    }
  );

  app.get('/auth/logout', (req, res, next) => {
    req.logout();
    res.redirect('/home');
  });

  app.get('/auth/currentUser', (req, res, next) => {
    if (req.user) {
      res.send(req.user); // Send the user their info
    } else {
      res.send(false); // The user is NOT logged in
    }
  });
};
