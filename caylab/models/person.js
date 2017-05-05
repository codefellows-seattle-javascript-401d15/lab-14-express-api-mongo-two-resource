'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  name: {type: String, required: true},
  pet: {type: String, default: 'none', required: true},
  petId: {type: Schema.Types.ObjectId},
});

module.exports = mongoose.model('person', personSchema);
