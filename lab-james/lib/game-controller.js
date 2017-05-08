'use strict';

const Game = require('../models/game.js');

module.exports = exports = {};

exports.createGame = function(game) {
  return new Game(game).save();
};

exports.fetchOneGame = function(gameId) {
  return Game.findById(gameId);
};

exports.fetchAllGames = function() {
  return Game.find({});
};

exports.deleteGameById = function(gameId) {
  return Game.findByIdAndRemove(gameId);
};

exports.updateGameById = function(gameId, Game) {
  return Game.findByIdAndUpdate(gameId, Game, {new: true});
};
