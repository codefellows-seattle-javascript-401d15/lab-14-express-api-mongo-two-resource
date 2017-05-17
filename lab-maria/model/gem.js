'use strict';
//Steven Universe themed because I'M AN ADULT
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gemSchema = Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  weapon: {type: String},
  isFusion: {type: Boolean, required: true},
  affiliation: {type: String, required: true},
  affID: {type: Schema.Types.ObjectId},
});

module.exports = mongoose.model('gem', gemSchema);
