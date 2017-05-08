'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = require('./game.js');

const gameConsoleSchema = Schema ({
  name: {type: String, required: true},
  company: {type: String, require: true},
  games: [{type: Schema.Types.ObjectId, ref: 'game'}],
});

const GameConsole = module.exports = mongoose.model('gameConsole', gameConsoleSchema);

GameConsole.findByIdAndAddGame = function(id, game) {
  return GameConsole.findById(id)
  .then(gameConsole => {
    game.gameConsoleId = gameConsole._id;
    this.tempGameConsole = gameConsole;
    return new Game(game).save();
  })
  .then(game => {
    this.tempGameConsole.games.push(GameConsole._id);
    this.tempGame = game;
    return this.tempGameConsole.save();
  })
  .then(() => {
    this.tempGame;
  })
  .catch(err => {
    Promise.reject(err);
  });
};
