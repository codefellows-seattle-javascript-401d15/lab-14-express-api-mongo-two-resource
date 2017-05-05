'use strict';

const debug = require('debug')('http:controller');
const Album = require('../model/album');

module.exports = exports = {};

exports.createAlbum = function(album) {
  debug('albumcontroller.createAlbum()');

  return new Album(album).save();
};

exports.fetchAlbum = function(id) {
  debug('albumcontroller.fetchAlbum()');

  return Album.findById(id);
};

exports.deleteAlbum = function(id) {
  debug('albumcontroller.deleteAlbum()');

  return Album.findByIdAndRemove(id);
};

exports.deleteAll = function() {
  debug('song-controller.deleteAll()');

  return Album.remove();
};
