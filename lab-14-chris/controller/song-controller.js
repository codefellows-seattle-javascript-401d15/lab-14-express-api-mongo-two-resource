'use strict';

const debug = require('debug')('http:controller');
const Song = require('../model/song');
const Album = require('../model/album');

module.exports = exports = {};

exports.createSong = function(song) {
  debug('songcontroller.createSong()');

  return Album.findByIdAndAddSong(song.albumId, song);
};

exports.fetchSong = function(id) {
  debug('songcontroller.fetchSong()');

  return Song.findById(id);
};

exports.fetchAllSongs = function() {
  debug('songcontroller.fetchAllSongs()');

  return Song.find();
};

exports.updateSong = function(id, song) {
  debug('songcontroller.updateSong()');

  return Song.findByIdAndUpdate(id, song, {new: true});
};

exports.deleteSong = function(id) {
  debug('songcontroller.deleteSong()');

  return Song.findByIdAndRemove(id);
};

exports.deleteAll = function() {
  debug('song-controller.deleteAll()');

  return Song.remove();
};
