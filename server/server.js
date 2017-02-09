var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var db = require("../database/dbconnection.js");
var listeners = require("./listeners.js");
var path = require('path');
// var userController = require('./users/userController.js');
// var session = require('express-session');
// var config = require('./config.js');
var app = express();

//middlewares
app.use(bodyparser.json());

//define port
var port = process.env.PORT || 3000;

var rootPath = path.join(__dirname, '/..');
var publicPath = path.join(rootPath, '/compiled/public');
app.use(express.static(path.join(__dirname, '../')));

//routes
//get routes
// app.get('/', function(req, res) {
//   res.sendFile('hello world from server');
// });
app.get('/api/scores', function(req, res) {
  res.send('This is where we would serve the signup');
});
// app.get('/login', function(req, res) {
//   res.send('This is where we would serve the login');
// });
// app.get('/memory', function(req, res) {
//   res.send('This is where we would serve the memory game');
// });
// app.get('/scramble', function(req, res) {
//   res.send('This is where we would serve the scramble game');
// });
// app.get('/:username', userController.getUser);
// app.get('/leaderboard', userController.getAll);

// //post routes
app.post('/api/user', listeners.userCheck);
// app.post('/signup', userController.signup);
// app.post('/login', userController.login);
// app.post('/scores', userController.postScore);
// app.post('/logout', userController.logout);

// //post routes
// app.post('/signup', userController.signup);
// app.post('/login', userController.login);
// app.post('/scores', userController.postScore);
// app.post('/logout', userController.logout);



app.listen(port, function () {
  console.log('Example app listening on port', port);
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV);
});
