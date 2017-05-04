'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeItem = Schema ({
  name: {type: String, required: true},
  difficulty: {type: String, required: true},
  time: {type: String, required: true},
});

module.exports = mongoose.model('recipe', recipeItem);
