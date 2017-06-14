'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toySchema = Schema({
  type: {type: String, required: true},
  color: {type: String, required: true},
  dogId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('toy', toySchema);
