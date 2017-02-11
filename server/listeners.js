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
    console.log("AddGame Listener");
    var email = req.body.email;

    var gameObj = {
      email: email,
      gameName: req.body.gameName,
      score:  req.body.score,
      date: new Date()
    };

    var newGame = new models.Game(gameObj);
    console.log("New Game Instance: ", newGame);

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
        console.log("No Score");
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
        console.log("Scores document: ", scores)
        
        var scoresArray = scores[newGame.gameName];
        
        console.log("Scores Array: ", scoresArray);

        // check length of array
        if (scoresArray.length < 10) {
          console.log("Inside the if < 10");
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
            console.log("ScoresArray after last sort.", scoresArray);
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
    var email = req.params.email;

    models.User.findOne({email}, function (err, user) {
      if (err) {
        res.end("Error: ", err);
      }
      
      if (user) {
        console.log('games', user.games);
        res.send(user.games);
      }    
    })
  }

};
