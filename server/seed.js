var User = require('../database/models.js').User;
var Score = require('../database/models.js').Score;
var Game = require('../database/models.js').Game;
var mongoose = require('mongoose');
var db = require('../database/dbconnection.js')
var _ = require('lodash');

const GAMES = ['nback', 'memory', 'simon', 'scramble'];

const randomIdx = () => _.random(0,3)
const randomScore = () => _.random(1,1000)
const randomLevel = () => _.random(1,9)

const addGameToCory = () => {
  var gameName = GAMES[randomIdx()];

  var game = new Game({
    gameName,
    name: cory.name,
    score: randomScore(),
    date: new Date()
  })

  if(gameName === 'nback') {
    game.level = randomLevel();
  }

  User.findOne({email: cory.email}, function(err, user) {
    user.games.push(game);
    user.save(function(err, game) {
      console.log('game added....');
    })
  })
}

var cory = new User({
  name: 'Cory',
  email: 'wolnewitz@gmail.com'
})

cory.save(function(err, c) {
  console.log('cory created', c);
  for(var i = 0; i < 10000; i++) {
    addGameToCory();
  }
})

