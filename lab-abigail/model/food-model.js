'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  cost: {type: Number, required: true},
});

module.exports = mongoose.model('food', foodSchema);
