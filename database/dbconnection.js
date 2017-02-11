var mongoose = require("mongoose");

// to establish mLabUri for Heroku's cloud hosted mongo db
var mLabUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@ds147979.mlab.com:47979/heroku_2xt0jdn5';

var localMongoUri = 'mongodb://localhost/megaminds';

var MONGO_URI = (process.env.NODE_ENV === 'production') ? mLabUri : localMongoUri;

mongoose.connect(MONGO_URI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection to mongoose error:'));

db.once('open', function() {
  console.log('Connected to Mongo!');
});

module.exports = db;