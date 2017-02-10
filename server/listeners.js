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
            res.send(user);
          }  
        })
      }
      if (user) {
        res.send(user);
      }
    });
  },

  // this works!!
  addGame: function (req, res) {
    var name = req.body.name;

    var gameObj = {
      name: name,
      gameName: req.body.gameName,
      score:  req.body.score,
      date: new Date()
    };

    var newGame = new models.Game(gameObj);

    // add game instance to overall scoreboard
    /* 
    Note: add games is only meant to work after the userCheck 
    function above was fired.  addGame is not handled to check to 
    see if a exists.
    */
    models.Score.findOne({scoreboard: 0}, function (err, scores) {
      if (err) {
        res.end("Error: ", err);
      }
      if (!scores) {
        var newScore = new models.Score ({
          scoreboard: 0,
          nback: [],
          memory: [],
          simon: [],
          scramble: []
        })

        newScore[newGame.gameName].push(newGame);

        newScore.save(function (err, game) {
          if (err) {
            res.end("Error: ", err);
          } else {
            res.end("Score added");
          }  
        })
      }

      if (scores) {
        scores[newGame.gameName].push(newGame);

        scores.save(function (err, game) {
          if (err) {
            res.end("Error: ", err);
          } else {
            res.end("Score added");
          }  
        })
      }
    })

    // add new game instance to users object
    models.User.findOne({name: name}, function(err, user) {
      if (err) {
        res.end("Error: ", err);
      }

      user.games.push(newGame);
      console.log("just pushed to users game list");

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
