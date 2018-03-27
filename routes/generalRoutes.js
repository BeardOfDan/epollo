const path = require('path');

const pagesPath = path.join(__dirname, '../epollo/pages/');

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send('home | user: ' + JSON.stringify(req.user, undefined, 2));
  });

  app.get('/home', (req, res) => {
    res.sendFile(pagesPath + 'index.html');
  });

  app.get('/explore', (req, res) => {
    res.sendFile(pagesPath + 'explore.html');
  });

  app.get('/sign', (req, res) => {
    res.sendFile(pagesPath + 'sign-up.html');
  });

  app.get('/newstory', (req, res) => {
    res.sendFile(pagesPath + 'new-story.html');
  });

  app.get((/\/?user=[a-z]*/g), (req, res) => {
    //Getting a url for any username
    const _url = req.url;
    // Getting username from url
    const currentUser = _url.split('').splice(_url.indexOf('=') + 1).join('');
    // Change the file in the session to the users data from databse
    res.sendFile(pagesPath + 'profile.html');
  });
};
