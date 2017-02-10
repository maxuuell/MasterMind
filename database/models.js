var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema ({
  name: String,
  gameName: String,
  score:  Number,
  level: Number,
  date: Date
});

var usersSchema = new Schema ({
  name: String,
  email: String,
  games: [gamesSchema]
});

// var topScoresSchema = new Schema ({
//   games: [gamesSchema]
// });

var scoresSchema = new Schema ({
  scoreboard: 0,
  nback: [gamesSchema],
  memory: [gamesSchema],
  simon: [gamesSchema],
  scramble: [gamesSchema]
})

exports.Game = mongoose.model("Game", gamesSchema);
exports.User = mongoose.model("User", usersSchema);
// exports.TopScore = mongoose.model("TopScore", topScoresSchema);
exports.Score = mongoose.model("Score", scoresSchema);