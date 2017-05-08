'use strict';

const GameConsole = require('../models/console.js');

module.exports = exports = {};

exports.createGameConsole = function(gameConsole){
  return new GameConsole(gameConsole).save();
};

exports.fetchOneGameConsole = function(consoleId) {
  return GameConsole.findById(consoleId);
};

exports.fetchAllGameConsoles = function() {
  return GameConsole.find({});
};

exports.deleteGameById = function(gameId) {
  return GameConsole.findByIdAndRemove(gameId);
};

exports.updateGameById = function(gameId, Game) {
  return GameConsole.findByIdAndUpdate(gameId, Game, {new: true});
};
