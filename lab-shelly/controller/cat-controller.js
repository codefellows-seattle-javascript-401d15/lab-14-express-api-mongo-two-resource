'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Cat = require('../model/cat');
const Shelter = require('../model/shelter');

module.exports = exports = {};

exports.createItem = function(shelterId, cat) {
  if(!shelterId) return Promise.reject(createError(400, 'shelter id required'));
  if(!cat) return Promise.reject(createError(400, 'cat required'));
  return Shelter.findByIdAndAddCat(shelterId, cat);
};
exports.fetchItem = function(id) {
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Cat.findById(id);
};

exports.fetchAll = function() {
  return Cat.find({});
};

exports.deleteItem = function(id){
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Cat.findByIdAndRemove(id);
};

exports.updateItem = function(id, cat) {
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!cat) return Promise.reject(createError(400, 'cat required'));
  return Cat.findByIdAndUpdate(id, {name: cat.name, mood: cat.mood}, {new: true});
};
