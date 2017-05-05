'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log('is something happening?');
const ninjaItem = Schema({
  name: {type: String, required: true},
  clan: {type: String, max: 1048},
  weapons: {type: String, max: 1048},
  // date:{type: Date, default: Date.now},
});

module.exports = mongoose.model('Ninja', ninjaItem);
