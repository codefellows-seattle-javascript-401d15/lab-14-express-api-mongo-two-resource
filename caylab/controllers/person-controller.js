'use strict';

const debug = require('morgan');
const Promise = require('bluebird');
const createError = require('http-errors');
const Person = require('../models/person.js');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


module.exports = exports = {};

exports.createPerson = function(person){
  debug('#createPerson');
  if(!person) return Promise.reject(createError(400, 'No person; Person required.'));
  return new Person(person).save();
};

exports.fetchPerson = function(id){
  debug('#fetchPerson');
  if(!id) return Promise.reject(createError(400, '!!No ID!! ID Required'));
  return Person.findById(id);
};

exports.fetchPeople = function() {
  debug('#fetchPeople');
  return Person.find({});
};

exports.updatePerson = function(id, person){
  debug('#updatePerson');
  if(!id) return Promise.reject(createError(400, '!!No schema!! Schema Required'));
  return Person.findByIdAndUpdate(id, person, {new: true});
};


exports.deletePerson = function(id){
  debug('#deletePerson');
  if(!id) return Promise.reject(createError(400, '!!No id!!'));
  return Person.findByIdAndRemove(id);
};
