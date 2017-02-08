var mongoose = require("mongoose");

// to establish mLabUri for Heroku's cloud hosted mongo db
var mLabUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@ds137749.mlab.com:37749/megaminds';

// to establish mongo db connection on localhost.
var localMongoUri = 'mongodb://localhost/megaminds';

// to determine which Uri to use, based on wheterh production or local.
// var MONGO_URI = (process.env.NODE_ENV === 'production') ? mLabUri : localMongoUri;

mongoose.connect(localMongoUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection to mongoose error:'));

db.once('open', function() {
  console.log('we connected to mongoose!');
});

module.exports = db;