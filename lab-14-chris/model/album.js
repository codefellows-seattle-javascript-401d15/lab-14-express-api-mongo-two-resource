'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumItem = Schema({
  title: {type: String, required:true},
  artist: {type: String, required: true},
  songs: [{type: Schema.Types.ObjectId, ref: song}]
});

module.exports = mongoose.model('album', albumItem);
