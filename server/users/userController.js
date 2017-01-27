var User = require('./userModel');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



module.exports = {
  //function for signin in user
  signup: function(req, res, next) {
    console.log('username is ', req.body.username);
    console.log('password is ', req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
      .exec(function(err, userProfile) {
        //if the user profile does not exist, we will create the new user
        console.log('userProfile is ', userProfile);
        if (!userProfile) {
          //hashes the password
          bcrypt.hash(password, null, null, function(err, hash) {
            if (err) {
              console.log('Error', err);
              res.status(500).send(err);
            } else {
              console.log('hash is ', hash);
              var newUser = new User({
                username: username,
                password: hash,
                highscoreMem: null,
                highscoreScram: null,
                memScores: [],
                scramScores: []
              });
              newUser.save(function(err, user) {
                if (err) {
                  console.log('SAVE ERROR', err);
                  res.status(500).send(err);
                }
                console.log('user saved', user);
              });
            }
          });
        //if the user already exists...
        } else {
          console.log('Account already exists');
          res.redirect('/signup');
        }
      });
    next();
  },
  //function for logging in user
  login: function(req, res, next){
    console.log('username is ', req.body.username);
    console.log('password is ', req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
      .exec(function(err, userProfile) {
        if (!userProfile) {
          console.log('userProfile does not exist');
          res.redirect('/login');
        } else {
          //bcrypt compare
          bcrypt.compare(password, userProfile.password, function(err, match) {
            if (match) {
              console.log('passwords match');
              req.session.user = userProfile;
              res.redirect('/');
            } else {
              console.log('password is incorrect');
              res.redirect('/login');
            }
          });
        }
      });
  }
};

