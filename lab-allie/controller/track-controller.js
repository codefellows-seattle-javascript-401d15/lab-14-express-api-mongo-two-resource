'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
// const Track = require('../model/track.js');
const Album = require('../model/album.js');

module.exports = exports = {};

exports.createTrack = function(req, res, track) {
  if(!track) return Promise.reject(createError(400, 'Album required'));
  
  Album.findByIdAndAddTrack(req.params.trackId, req.body)
  .then(track => res.json(track))
  .catch(err => res.status(404).send(err.message));
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