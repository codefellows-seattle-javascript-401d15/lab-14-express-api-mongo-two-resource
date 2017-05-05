'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = Schema ({
  make: {type: String, required: true},
  model: {type: String, required: true},
  rigId: {type: Schema.Types.ObjectId, required: true},
});

module.export = mongoose.model('car', carSchema);
