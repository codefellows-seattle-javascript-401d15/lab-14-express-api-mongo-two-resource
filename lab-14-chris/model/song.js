'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songItem = Schema({
  title: {type: String, required: true},
  arist: {type: String, required: true},
  album: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
  albumId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('song', songItem);
