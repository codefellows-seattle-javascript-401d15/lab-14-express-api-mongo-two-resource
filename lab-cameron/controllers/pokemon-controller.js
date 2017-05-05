'use strict';

const Pokemon = require('../models/pokemon');

module.exports = exports = {};

exports.createPokemon = function(pokemon) {
  return new Pokemon(pokemon).save();
};

exports.fetchPokemon = function(id) {
  return Pokemon.findById(id).populate('moves');
};

exports.gottaFetchEmAll = function() {
  return Pokemon.find({}).populate('moves');
};

exports.updatePokemon = function(id, pokemon) {
  return Pokemon.findByIdAndUpdate(id, pokemon, {new: true});
};

exports.deletePokemon = function(id) {
  return Pokemon.findByIdAndRemove(id);
};
