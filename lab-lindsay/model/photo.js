'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = Schema({
  photoName: {type: String, required: true},
  galleryId: {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('photo', photoSchema);
