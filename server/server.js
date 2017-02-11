var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var db = require("../database/dbconnection.js");
var listeners = require("./listeners.js");
var path = require('path');
var models = require('../database/models.js');

mongoose.Promise = global.Promise;

var app = express();

//middlewares
app.use(bodyparser.json());

//define port
var port = process.env.PORT || 3000;

var rootPath = path.join(__dirname, '/..');
app.use(express.static(rootPath));

// get endpoints
app.get("/api/user/:email/scores", listeners.userScores);
// to get top ten scores of specific game
app.get("/api/:game/scores", listeners.leaderBoard);

// post endpoints
app.post("/api/game", listeners.addGame);
app.post("/api/user", listeners.userCheck);

app.get('*', function (request, response){
  response.sendFile(path.resolve(rootPath + '/index.html'))
})

// listener
app.listen(port, function () {
  console.log('Example app listening on port', port);
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV);
});
