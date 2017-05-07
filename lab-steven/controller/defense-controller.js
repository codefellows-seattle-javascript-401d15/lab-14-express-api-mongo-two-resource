'use strict';

const Defense = require('../model/defense');
const Seahawk = require('../model/seahawk');
const Promise = require('bluebird');
const createError = require('http-errors');

module.exports = exports = {};

exports.createDef = function(defense){
  if (!defense) return Promise.reject(createError(400, 'defense required'));
  return new Defense(defense).save()
  .then(def => Promise.resolve(def))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.readDef = function(id){
  if (!id) return Promise.reject(createError(400, 'id required'));
  return Defense.find(id)
  // .populate('hawks')
  .then(def => Promise.resolve(def))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateDef = function(id, defUp){
  if (!id) return Promise.reject(createError(400, 'id required'));
  if (!defUp) return Promise.reject(createError(400, 'defense updates required'));
  return Defense.update(id, defUp)
  .then(def => Promise.resolve(def))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteDef = function(id){
  if (!id) return Promise.reject(createError(400, 'id required'));
  return Defense.find(id)
  .then(defense => Seahawk.findAndRemoveDef(defense[0]._id))
  // return Defense.remove(id)
  .then(def => Promise.resolve(def))
  .catch(err => Promise.reject(createError(500, err.message)));
};
