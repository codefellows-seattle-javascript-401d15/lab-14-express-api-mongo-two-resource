'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Gallery = require('../model/gallery.js');

module.exports = exports = {};

exports.createGallery = function(req, res, gallery) {
  if(!gallery) return Promise.reject(createError(400, 'Gallery required'));

  new Gallery(req.body).save()
  .then(gallery => res.json(gallery))
  .catch(err => res.status(400).send(err.message));
};

exports.fetchGallery = function(id, res) {
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return Gallery.findById(id)
  .then(gallery => {
    res.json(gallery);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchAllGallerys = function(res) {
  return Gallery.find()
  .then(gallery => res.json(gallery))
  .catch(err => res.status(400).send(err.message));
};

exports.updateGallery = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));

  Gallery.findOneAndUpdate(id, req.body, {new: true})
  .then(gallery => res.json(gallery))
  .catch(err => res.status(400).send(err.message));
};

exports.removeGallery = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));

  Gallery.deleteOne(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};
