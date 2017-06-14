'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Shelter = require('../model/shelter');

module.exports = exports = {};

exports.createItem = function(shelter) {
  if(!shelter) return Promise.reject(createError(400, 'shelter required'));
  return new Shelter(shelter).save();
};

exports.fetchItem = function(id) {
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Shelter.findById(id)
  .populate('cats');
};

exports.fetchAll = function() {
  return Shelter.find({})
  .populate('cats');
};

exports.deleteItem = function(id){
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Shelter.findByIdAndRemove(id);
};

exports.updateItem = function(id, shelter) {
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!shelter) return Promise.reject(createError(400, 'shelter required'));
  return Shelter.findByIdAndUpdate(id, {name: shelter.name, neighborhood: shelter.neighborhood}, {new: true})
  .populate('cats');
};
