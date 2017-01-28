var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var userController = require('./users/userController.js');
var session = require('express-session');
var config = require('./config.js')
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


//Mongoose
var uri;
process.env.PORT ? uri = config.web : uri = config.local;
mongoose.connect('mongodb://localhost/mastermind');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection to mongoose error:'));
db.once('open', function() {
  console.log('we connected to mongoose!');
});


//define port
var port = process.env.PORT || 3000;



//routes
app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/profile', requireLogin);
app.post('/scores', userController.postScore);
app.get('/leaderboard', userController.getAll);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
