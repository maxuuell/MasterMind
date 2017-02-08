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

exports.Games = mongoose.model("Games", gamesSchema);
exports.Users = mongoose.model("Users", usersSchema);