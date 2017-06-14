'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planetItem = Schema({
  name: {type: String, required: true},
  universeId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('planet', planetItem);
