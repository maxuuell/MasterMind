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
<<<<<<< HEAD
  games: [gamesSchema]
=======
  games: [gamesSchema]  
>>>>>>> c6d30e6f792381f674bbf5b3ce681341dd552ed5
});

var Games = mongoose.model("Games", gamesSchema);
var Users = mongoose.model("Users", usersSchema);

/*****************
create a user in a Room

var Users = new Rooms();

Users.games.push({ gameName: "enback", score: 10, date: date format });

Users.save(function (err) {
  if (!err) console.log('Success!');
});
***************/

// var UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     require: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     require: true
//   },
//   memoryHigh: Number,
//   scrambleHigh: Number,
//   memoryArray: [Number],
//   scrambleArray: [Number]
// });

module.exports = mongoose.model("", UserSchema);
