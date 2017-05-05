'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HawkSchema = Schema({
  name: {type: String, required: true},
  pos: {type: String, required: true},
  defId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('hawk', HawkSchema);
