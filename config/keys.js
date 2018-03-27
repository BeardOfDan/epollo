if (process.env.NODE_ENV === 'production') {
  // Any production specific tasks can be done here
} else { // development
  require('dotenv').config(); // set up local environment variables
}

module.exports = {
  'googleClientID': process.env.GOOGLE_CLIENT_ID,
  'googleClientSecret': process.env.GOOGLE_CLIENT_SECRET,
  'mongoURI': `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
  'cookieKey': process.env.COOKIE_KEY
}
