var models = require("../database/models.js");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var Q = require('q');
//to remove the mongoose Promise deprecated warning
mongoose.Promise = require('q').Promise;
// mongoose.Promise = global.Promise;
// mongoose.Promise = require('bluebird');

module.exports = {
  userCheck: function (req, res) {
    console.log("Made it to the listener!")
    var email = req.body.email;
    
    var userInfo = {
      name: req.body.name,
      email: email,
      games: []
    };

    var promise = models.Users.findOne({email: email}).exec();

    promise.then(function (user) {
      console.log(user);
      if(!user) {
        console.log("no user!")
        var newUser = new models.Users(userInfo);
        newUser.save();
        res.send({redirect: '/profile'});
      } else {
        res.send("User already exists.");
      }
    })

    console.log("Promise: ", promise);
  },

  fetchUserScores: function (req, res) {
    var user = req.body.userName;





  }

};