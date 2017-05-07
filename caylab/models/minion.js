'use strict';

const mongoose = require('mongoose');
const Summoner = require('./summoner.js');
const Schema = mongoose.Schema;

const minionSchema = Schema({
  name: {type: String, required: true},
  summoner: {type: String, default: 'none', required: true},
  summonerId: {type: Schema.Types.ObjectId},
});

module.exports = mongoose.model('minion', minionSchema);
