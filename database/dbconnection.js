var mongoose = require("mongoose");

// to establish mLabUri for Heroku's cloud hosted mongo db
var mLabUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@ds137749.mlab.com:37749/megaminds';

var localMongoUri = 'mongodb://localhost/megaminds';

mongoose.connect(localMongoUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection to mongoose error:'));

db.once('open', function() {
  console.log('Connected to Mongo!');
});

module.exports = db;