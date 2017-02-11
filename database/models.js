var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema ({
  email: String,
  userName: String,
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

var scoresSchema = new Schema ({
  scoreboard: 0,
  nback: [gamesSchema],
  memory: [gamesSchema],
  simon: [gamesSchema],
  scramble: [gamesSchema]
})

exports.Game = mongoose.model("Game", gamesSchema);
exports.User = mongoose.model("User", usersSchema);
exports.Score = mongoose.model("Score", scoresSchema);