'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = Schema({
  name: {type: String, require:true},
  timeStamp: {type: Date, default: Date.now},
  cars: [{type: Schema.Types.ObjectId, ref : 'car'}],
});

module.exports = mongoose.model('vehicles', vehicleSchema);
