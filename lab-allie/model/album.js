'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Track = require('./track.js');
const albumSchema = Schema({
  artist: {type: String, required: true},
  title: {type: String, required: true},
  year: {type: String, required: true},
  dateCreated: {type: Date, default: Date.now},
  tracks: [{type: Schema.types.ObjectId, ref: 'track'}],
});

const Album = module.exports.mongoose.model('album', albumSchema);

Album.findByIdAndAddTrack = function(id, track) {
  return Album.findById(id)
  .then(album => {
    track.albumId = album._id;
    this.tempAlbum = album;
    return new Track(track).save();
  })
  .then(track => {
    this.tempAlbum.tracks.push(track._id);
    this.tempTrack = track;
    return this.tempAlbum.save();
  })
  .then(() => this.tempTrack);
};