'use strict';

const createError = require('http-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  moves: [{type: Schema.Types.ObjectId, ref: 'move'}],
});

const Pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);

Pokemon.findByIdAndAddMove = function(id, pokemon, moveId) {
  return Pokemon.findById(id)
  .then(pokemon => {
    if (pokemon.moves.length >= 4) return Promise.reject(createError(400, 'this pokemon already knows 4 moves...please remove a move first'));
    this.tempPokemon = pokemon;
    this.tempPokemon.moves.push(moveId);
    return this.tempPokemon.save();
  })
  .catch(err => Promise.reject(err));
};

Pokemon.findByIdAndRemoveMove = function(id, pokemon, moveId) {
  return Pokemon.findById(id)
  .then(pokemon => {
    this.tempPokemon = pokemon;
    this.tempPokemon.moves.pop(moveId);
    return this.tempPokemon.save();
  })
  .catch(err => Promise.reject(err));
};
