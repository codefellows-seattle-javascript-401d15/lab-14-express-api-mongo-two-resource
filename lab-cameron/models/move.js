'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = Schema({
  name: {type: String, required: true},
  attack: {type: Number, required: true},
  power: {type: Number, required: true},
});

module.exports = mongoose.model('move', moveSchema);
