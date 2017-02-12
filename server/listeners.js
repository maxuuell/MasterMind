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

    var userName = req.body.name;
    var email = req.body.email;

    var gameObj = {
      email: email,
      userName: userName,
      gameName: req.body.gameName,
      score:  req.body.score,
      date: new Date()
    };

    var newGame = new models.Game(gameObj);

    // add game instance to overall scoreboard
    /* 
    Note: add games is only meant to work after the userCheck 
    function above was fired.  addGame is not handled to check to 
    see if a user exists.
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
        
        var scoresArray = scores[newGame.gameName];

        // check length of array
        if (scoresArray.length < 10) {
          // if less than 10, push
          scoresArray.push(newGame);
          // if not,
          scoresArray.sort((a,b) => b.score - a.score);
        } else {
            // compare to last index
          if (scoresArray[scoresArray.length - 1].score < newGame.score) {
            // if larger 
            // pop last index
            scoresArray.pop();
            // add new game
            scoresArray.push(newGame);
            // sort
            scoresArray.sort((a,b) => b.score - a.score);
          }   
        }

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
    models.User.findOne({email: email}, function(err, user) {
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
    var email = req.params.email;

    models.User.findOne({email}, function (err, user) {
      if (err) {
        res.end("Error: ", err);
      }
      
      if (user) {
        res.send(user.games);
      }    
    })
  },

  leaderBoard: function (req, res) {
    var game = req.params.game;

    models.Score.findOne({scoreboard: 0}, function (err, scores) {
      if (err) {
        res.end("Error: ", err);
      }

      if(scores) {
        var topTenScoresArray = scores[game];
        res.send(JSON.stringify(topTenScoresArray));
      }
    })
  }

};
