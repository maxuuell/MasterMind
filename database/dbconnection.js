var mongoose = require("mongoose");
<<<<<<< HEAD
=======
var models = require("./models.js");
>>>>>>> c6d30e6f792381f674bbf5b3ce681341dd552ed5

// to establish mLabUri for Heroku's cloud hosted mongo db
var mLabUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@ds137749.mlab.com:37749/megaminds';

// to establish mongo db connection on localhost.
var localMongoUri = 'mongodb://localhost/megaminds';

// to determine which Uri to use, based on wheterh production or local.
<<<<<<< HEAD
// var MONGO_URI = (process.env.NODE_ENV === 'production') ? mLabUri : localMongoUri;

mongoose.connect(localMongoUri);
=======
var MONGO_URI = (process.env.NODE_ENV === 'production') ? mLabUri : localMongoUri;

mongoose.connect(MONGO_URI);
>>>>>>> c6d30e6f792381f674bbf5b3ce681341dd552ed5

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection to mongoose error:'));

db.once('open', function() {
  console.log('we connected to mongoose!');
});

<<<<<<< HEAD
module.exports = db;
=======
module.exports = db;




>>>>>>> c6d30e6f792381f674bbf5b3ce681341dd552ed5
