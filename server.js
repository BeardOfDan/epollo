var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var dbKeys = require('./keys');
var EventEmitter = require('events').EventEmitter;
var app = express();

// The tools for forms
var passwordValidator = require('password-validator');
var emailValidator = require("email-validator");

//Setting up mongoose
var mongoose = require('mongoose');
mongoose.connect(dbKeys.url);
var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', function() {
  console.log('Database connection error');
});

var userSchema = new Schema({
  fullname: String,
  email: String,
  username: String,
  password: String,
  stories: {},
  threads: {}
});
var storySchema = new Schema({
  title: String,
  text: String,
  genre: {},
  author: String,
  nextThreads: {},
  parent: String,
  original: String
});
var userModel = mongoose.model('user', userSchema);
var storyModel = mongoose.model('story', storySchema);

//This sets what port the server should listen on.
// process.env.PORT is how we get the port from the server
var port = process.env.PORT || 8080;
var _url;

app.set('trust proxy', 1);
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'epollo/pages/index.html'));
});
app.get('/home',(req,res)=>{
  res.sendFile(path.join(__dirname, 'epollo/pages/index.html'));
});
app.get('/explore',(req,res)=>{
  res.sendFile(path.join(__dirname, 'epollo/pages/explore.html'));
});
app.get('/sign',(req,res)=>{
  res.sendFile(path.join(__dirname, 'epollo/pages/sign-up.html'));
});
app.get('/newstory',(req,res)=>{
  res.sendFile(path.join(__dirname, 'epollo/pages/new-story.html'));
});
app.get((/\/?user=[a-z]*/g),(req,res)=>{
  //Getting a url for any username
  _url = req.url;
  // Getting username from url
  var currentUser = _url.split('').splice(_url.indexOf('=')+1).join('');
  // Change the file in the session to the users data from databse
  res.sendFile(path.join(__dirname, 'epollo/pages/profile.html'));
});

app.post('/login', (req, res)=> {
  var userName = req.body.username;
  var userPassword = req.body.password;
  console.log(userName + " " + userPassword);
});

app.post('/sign', (req, res)=> {
  var userFullName = req.body.fullName;
  var userEmail = req.body.email;
  var userName = req.body.username;
  var userPassword = req.body.password;

  // For the password
  var passwodSchema = new passwordValidator();
  passwodSchema.is().min(8)                       // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

  isExistingUser(req, function(err, canRegister) {
    console.log(canRegister);
    if(err) {
      console.log(err);
    }
    if(passwodSchema.validate(req.body.password) &&
      emailValidator.validate(req.body.email) &&
      canRegister) {
      console.log('Doesn\'t exist');
    } else {
      console.log('Exist');
    }
  });
});
// Checkers for the same user info.
function isExistingUser(requiester, func) {
  var query = userModel.find({username: requiester.body.username}, function(err, result) {
    if(err) { func(err, false); }
    console.log(result);
    if(result) {
      func(null, false);
    }
  });
  func(null, true);
}

//This statment tells the server to send any file requested in the lib folder
app.use(express.static(path.join(__dirname, 'epollo')));

//This tell the server to start listening on the port
app.listen(port,()=> {
  console.log("Site running on port: "+port);
})
