'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Track = require('../model/track.js');
const Album = require('../model/album.js');

module.exports = exports = {};

exports.createTrack = function(albumId, track, res) {
  if(!track) return Promise.reject(createError(400, 'Album required'));
  
  Album.findByIdAndAddTrack(albumId, track)
  .then(newTrack => {
    res.json(newTrack);
    console.log('new track', newTrack);
  })
  .catch(() => Promise.reject(createError(500, 'Error saving track in mongo')));
};

exports.fetchTrack = function(albumId, trackId, res) {
  if(!albumId) return Promise.reject(createError(400, 'Album ID required'));
  
  Album.findAlbumAndFindTrack(albumId, trackId)
  .then(fetchedTrack => {
    console.log('fetched track', res.json(fetchedTrack));
    return fetchedTrack;
  })
  .catch(() => Promise.reject(createError(500, 'Error getting track from mongo')));
};

// exports.fetchAllTracks = function(albumId, res) {
//   if(!albumId) return Promise.reject(createError(400, 'Album ID required'));
//   
//   Album.findAllTracks(albumId);
// };

exports.updateTrack = function(trackId, req, res) {
  if(!trackId) return Promise.reject(createError(400, 'Album ID required'));
  
  Track.findOneAndUpdate(trackId, req.body, {new: true})
  .then(track => res.json(track))
  .catch(err => res.status(400).send(err.message));
};

exports.removeTrack = function() {};