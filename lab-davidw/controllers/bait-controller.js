'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Bait =require('../models/bait');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

exports.createBait = function(req) {
  if (!req) return Promise.reject(createError(400, 'Bad request'));

  return new Bait(req.body).save();
};

exports.fetchBait = function(id) {
  if (!id) return Promise.reject(createError(400, 'Bad request, id required'));

  return Bait.findById(id);
};

exports.fetchAllBaits = function() {
  return Bait.find();
};

exports.updateBait = function(req, res, id, bait) {
  if (!id || !bait) return Promise.reject(createError(400, 'Bad request'));

  return Bait.findByIdAndUpdate(id, bait, {new: true})
  .then(bait=> {
    res.json(bait);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.deleteBait = function(id, res) {
  if (!id) return Promise.reject(createError(400, 'Bad request'));

  return Bait.findByIdAndRemove(id)
  .then(() => {res.status(204)
  .send(`bait ${id} deleted`);
  })
  .catch(err => res.status(404).send(err.message));
};
