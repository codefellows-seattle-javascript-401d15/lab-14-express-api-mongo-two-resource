'use strict';

const Move = require('../models/move');

module.exports = exports = {};

exports.createMove = function(move) {
  return new Move(move).save();
};

exports.fetchMove = function(id) {
  return Move.findById(id);
};

exports.fetchMovesList = function() {
  return Move.find({});
};

exports.updateMove = function(id, move) {
  return Move.findByIdAndUpdate(id, move, {new: true});
};

exports.deleteMove = function(id) {
  return Move.findByIdAndRemove(id);
};
