'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Photo = require('../model/photo.js');
const Gallery = require('../model/photo-gallery.js');

module.exports = exports = {};

exports.createPhoto = function(galleryId, photo, res) {
  if(!photo) return Promise.reject(createError(400, 'Gallery required'));

  Gallery.findByIdAndAddPhoto(galleryId, photo)
  .then(newPhoto => {
    res.json(newPhoto);
    console.log('new photo', newPhoto);
  })
  .catch(() => Promise.reject(createError(500, 'Error saving photo in mongo')));
};

exports.fetchPhoto = function(galleryId, photoId, res) {
  if(!galleryId) return Promise.reject(createError(400, 'gallery ID required'));

  Gallery.findGalleryAndPhoto(galleryId, photoId)
  .then(fetchedPhoto => {
    console.log('fetched photo', res.json(fetchedPhoto));
    return fetchedPhoto;
  })
  .catch(() => Promise.reject(createError(500, 'Error fetching photo from mongo')));
};

exports.updatePhoto = function(photoId, req, res) {
  if(!photoId) return Promise.reject(createError(400, 'photo ID required'));

  Photo.findOneAndUpdate(photoId, req.body, {new: true})
  .then(photo => res.json(photo))
  .catch(err => res.status(400).send(err.message));
};

exports.removePhoto = function(photoId, req, res) {
  if(!photoId) return Promise.reject(createError(400, 'photo ID required'));

  Photo.findByIdAndRemove(photoId)
    .then(() => res.status(204).send())
    .catch(err => res.send(err));
};
