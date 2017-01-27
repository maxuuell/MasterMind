var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  highscoreMem: Number,
  highscoreScram: Number,
  memScores: [Number],
  scramScores: [Number]
});


module.exports = mongoose.model("User", UserSchema);
