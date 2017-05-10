'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Dog = require('../models/dog');

module.exports = exports = {};

exports.createDog = function(dog) {
  if(!dog) return Promise.reject(createError(400, 'Dog required!'));
  return new Dog(dog).save();
};

exports.fetchOneDog = function(id) {
  if(!id) return Promise.reject(createError(400, 'ID required!'));
  return Dog.findById(id);
};

exports.fetchAllDogs = function() {
  return Dog.find();
};

exports.updateDog = function(id, newDog) {
  if(!id) return Promise.reject(createError(400, 'ID required!'));
  if(!newDog) return Promise.reject(createError(400, 'New Dog required!'));
  return Dog.findByIdAndUpdate(id, {name: newDog.name, breed: newDog.breed}, {new: true});
};

exports.deleteDog = function(id) {
  if(!id) return Promise.reject(createError(400, 'ID required!'));
  return Dog.findByIdAndRemove(id);
};
