'use strict';


const mongoose = require('mongoose');
const Song = require('../model/song');
const 

const Album = module.exports = mongoose.model('album', albumItem);

Album.findByIdAndAddSong = function(id, song) {
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
