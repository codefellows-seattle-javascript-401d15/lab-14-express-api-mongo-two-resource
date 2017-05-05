'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consoleHardware = Schema({
  name: {type: String, required: true},
  manufacturer: {type: String, required: true},
  releaseYear: {type: Number, required: true},
});

module.exports = mongoose.model('console', consoleHardware);
