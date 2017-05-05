'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = Schema({
  title: {type: String, required: true},
  artist: {type: String, required: true},
  album: {type: String, required: true},
  albumId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('song', songSchema);
