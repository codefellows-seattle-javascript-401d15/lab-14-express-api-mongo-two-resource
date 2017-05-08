'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Lure =require('../models/lure');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

exports.createLure = function(req) {
  if (!req) return Promise.reject(createError(400, 'Bad request'));

  return new Lure(req.body).save();
};

exports.fetchLure = function(id) {
  if (!id) return Promise.reject(createError(400, 'Bad request, id required'));

  return Lure.findById(id);
};

exports.fetchAllLures = function() {
  return Lure.find();
};

exports.updateLure = function(req, res, id, lure) {
  if (!id || !lure) return Promise.reject(createError(400, 'Bad request'));

  return Lure.findByIdAndUpdate(id, lure, {new: true})
  .then(lure=> {
    res.json(lure);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.deleteLure = function(id, res) {
  if (!id) return Promise.reject(createError(400, 'Bad request'));

  return Lure.findByIdAndRemove(id)
  .then(() => {res.status(204)
  .send(`lure ${id} deleted`);
  })
  .catch(err => res.status(404).send(err.message));
};
