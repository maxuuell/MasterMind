var models = require("../database/models.js");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {
  // this works
  userCheck: function (req, res) {
    var name = req.body.name;

    models.User.findOne({name: name}, function(err, user) {
      if(err) {
        console.log("Error: ", err);
      } 
      if (!user) {
        var newUser = new models.User({
          name: name,
          email: req.body.email,
          games: []
        });

        newUser.save(function (err, user) {
          if (err) {
            console.log("Error", err);
          } else {
            res.end("User added", user);
          }  
        })
      }
      if (user) {
        res.end("User already exists", user);
      }
    });
  },

  // this works!!
  addGame: function (req, res) {
    var name = req.body.name;

    var gameObj = {
      gameName: req.body.gameName,
      score:  req.body.score,
      date: new Date()
    }

    var newGame = new models.Game(gameObj);

    models.User.findOne({name: name}, function(err, user) {
      if (err) {
        res.end("Error: ", err);
      }

      user.games.push(newGame);
      
      user.save(function (err, game) {
        if (err) {
          res.end("Error: ", err);
        } else {
          res.end("Game added");
        }  
      })
    });
  },

  userScores: function (req, res) {
    var name = req.params.name;
    models.User.findOne({name: name}, function (err, user) {
      if (err) {
        res.end("Error: ", err);
      }
      
      if (user) {
        userGames = JSON.stringify(user.games);
        console.log(userGames);
        res.send(userGames);
      }    
    })
  }

};