var express = require('express');
var bodyparser = require('body-parser');

var app = express();


//define port
var port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.get('/', function(req,res) {
  res.send('hello world');
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});