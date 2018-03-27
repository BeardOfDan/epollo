const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res, next) => {
  if (!req.user) { // there is no user
    return res.status(401).send({ 'error': 'You must be logged in to access this route' });
  }

  const user = await User.findById(req.user.id);

  // Ensure that the user's credentials match with a saved user
  if (!user) {
    console.log('An unknown user attempted to use our website!' + JSON.stringify(req.user, undefined, 2) + '\n\n');
    return res.status(401).send({ 'error': 'FRAUD! You are not in our database!' });
  }

  // Ensure that the user's credentials are correct
  if ((req.user.displayName !== user.displayName) || (req.user.email !== user.email)) {
    console.log('Someone with false credentials tried to use our website!' + JSON.stringify(req.user, undefined, 2) + '\n\n');
    return res.status(401).send({ 'error': 'FRAUD! Your user information is incorrect!' });
  }

  // The user is legitimate and logged in
  next();
};
