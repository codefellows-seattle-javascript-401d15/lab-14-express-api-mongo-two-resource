'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
  vehicleId: {type: Schema.Types.ObjectId, require: true},
});

module.exports = mongoose.model('car', carSchema);
