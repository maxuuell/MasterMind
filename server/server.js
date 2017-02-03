var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var userController = require('./users/userController.js');
var session = require('express-session');
var config = require('./config.js');
var app = express();

//middlewares
app.use(bodyparser.json());
app.use(session({
  user: null,
  secret: 'master of my domain',
  cookie: {maxAge: 60000}
}));

//require login
var requireLogin = function(req, res, next) {
  req.session.user ? res.render('/profile') : res.redirect('/login');
};

//to remove the mongoose Promise deprecated warning
mongoose.Promise = global.Promise;

//Mongoose
// var uri;
// process.env.PORT ? uri = config.web : uri = config.local;
mongoose.connect('mongodb://localhost/mastermind');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection to mongoose error:'));
db.once('open', function() {
  console.log('we connected to mongoose!');
});


//define port
var port = process.env.PORT || 3000;

var rootPath = path.join(__dirname,'/..');
var publicPath = path.join(rootPath, '/compiled/public');
app.use(express.static(path.join(__dirname, '../')));

//routes
//get routes
// app.get('/', function(req, res) {
//   res.sendFile('hello world from server');
// });
app.get('/signup', function(req, res) {
  res.send('This is where we would serve the signup');
});
app.get('/login', function(req, res) {
  res.send('This is where we would serve the login');
});
app.get('/memory', function(req, res) {
  res.send('This is where we would serve the memory game');
});
app.get('/scramble', function(req, res) {
  res.send('This is where we would serve the scramble game');
});
app.get('/#/profile', requireLogin);
app.get('/leaderboard', userController.getAll);

//post routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/scores', userController.postScore);



app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
