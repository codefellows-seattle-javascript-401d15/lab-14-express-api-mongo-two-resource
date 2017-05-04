'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItem = Schema ({
  name: {type: String, required: true},
  type: {String, required: true},
  cost: {type: Number, required: true},
});

module.exports = mongoose.model('food', foodItem);
