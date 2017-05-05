'use strict';

const debug = require('debug');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song =require('./song');

const albumSchema = Schema({
  title: {type: String, required:true},
  artist: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
  songs: [{type: Schema.Types.ObjectId, ref: 'song'}],
});

const Album = module.exports = mongoose.model('album', albumSchema);

Album.findByIdAndAddSong = function(id, song) {
  debug('Album.findByIdAndAddSong()');
  return Album.findById(id)
  .then(album => {
    song.albumId = album._id;
    this.tempAlbum = album;
    return new Song(song).save();
  })
  .then(song => {
    this.tempAlbum.songs.push(song._id);
    this.tempSong = song;
    return this.tempAlbum.save();
  })
  .then(() => this.tempSong);
};
