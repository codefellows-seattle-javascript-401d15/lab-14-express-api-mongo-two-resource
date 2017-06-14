'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Toy = require('../models/toy');
const Dog = require('../models/dog');

module.exports = exports = {};

exports.createToy = function(dogId, toy) {
  if(!toy) return new Promise.reject(createError(400, 'Toy required!'));
  return Dog.findByIdAndAddToy(dogId, toy);
};

exports.fetchOneToy = function(id) {
  if(!id) return new Promise.reject(createError(400, 'ID required!'));
  return Toy.findById(id);
};

exports.fetchAllToys = function() {
  return Toy.find();
};

exports.updateToy = function(id, newToy) {
  if(!id) return new Promise.reject(createError(400, 'ID required!'));
  if(!newToy) return new Promise.reject(createError(400, 'New Toy required!'));
  return Toy.findByIdAndUpdate(id, {type: newToy.type, color: newToy.color}, {new: true});
};

exports.deleteToy = function(id) {
  if(!id) return new Promise.reject(createError(400, 'ID required!'));
  return Toy.findByIdAndRemove(id);
};
