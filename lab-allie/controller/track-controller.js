'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Track = require('../model/track.js');

module.exports = exports = {};

exports.createTrack = function() {};

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