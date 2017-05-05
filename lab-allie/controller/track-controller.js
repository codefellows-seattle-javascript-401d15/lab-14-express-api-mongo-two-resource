'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
// const Track = require('../model/track.js');
const Album = require('../model/album.js');

module.exports = exports = {};

exports.createTrack = function(albumId, track) {
  if(!track) return Promise.reject(createError(400, 'Album required'));
  
  Album.findByIdAndAddTrack(albumId, track)
  .then(newTrack => newTrack)
  .catch(Promise.reject(createError(400, 'Error in newTrack creation')));
};

exports.fetchTrack = function() {};

exports.fetchAllTracks = function() {};

exports.updateTrack = function() {};

exports.removeTrack = function() {};




exports.fetchAlbum = function(id, res) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  return Album.findById(id)
  .then(album => {
    res.json(album);
  })
  .catch(err => res.status(400).send(err.message));
};