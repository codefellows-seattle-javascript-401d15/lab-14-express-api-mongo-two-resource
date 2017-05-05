'use strict';

const createError = require('http-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Move = require('../models/move');

const pokemonSchema = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  moves: [{type: Schema.Types.ObjectId, ref: 'move'}],
});

const Pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);

Pokemon.findByIdAndAddMove = function(id, pokemon, moveId) {
  let targetMove;
  return Move.findById(moveId)
  .then(move => {
    targetMove = move;
    return Pokemon.findById(id).populate('moves')
    .then(pokemon => {
      if (pokemon.moves.length >= 4) return Promise.reject(createError(400, 'this pokemon already knows 4 moves...please remove a move first'));
      pokemon.moves.forEach(ele => {
        if (ele._id.toString() === moveId) {
          return Promise.reject(createError(400, 'this pokemon cannot learn this move because it already knows it'));
        }
      });
      this.tempPokemon = pokemon;
      this.tempPokemon.moves.push(targetMove);
      return this.tempPokemon.save();
    })
    .catch(err => Promise.reject(err));
  })
  .catch(err => Promise.reject(err));
};

Pokemon.findByIdAndRemoveMove = function(id, pokemon, moveId) {
  let targetMove;
  return Move.findById(moveId)
  .then(move => {
    targetMove = move;
    return Pokemon.findById(id).populate('moves')
    .then(pokemon => {
      this.tempPokemon = pokemon;
      this.tempPokemon.moves.pop(targetMove);
      return this.tempPokemon.save();
    })
    .catch(err => Promise.reject(err));
  })
  .catch(err => Promise.reject(err));
};
