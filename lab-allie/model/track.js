'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = Schema({
  trackName: {type: String, required: true},
  albumId: {type: Schema.Types.ObjectId, required: true},
}),

module.exports = mongoose.model('tracks', noteSchema);