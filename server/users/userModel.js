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
  memoryHigh: Number,
  scrambleHigh: Number,
  memoryArray: [Number],
  scrambleArray: [Number]
});



module.exports = mongoose.model("User", UserSchema);
