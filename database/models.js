var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema ({
  gameName: String,
  score:  Number,
  date: Date
});

var usersSchema = new Schema ({
  name: String,
  email: String,
  games: [gamesSchema]
});

exports.Game = mongoose.model("Game", gamesSchema);
exports.User = mongoose.model("User", usersSchema);