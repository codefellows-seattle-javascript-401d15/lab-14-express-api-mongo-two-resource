'use strict';

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
    this.tempPokemon = pokemon;
    this.tempPokemon.moves.push(moveId);
    return this.tempPokemon.save().populate('moves');
  })
  .catch(err => Promise.reject(err));
};
