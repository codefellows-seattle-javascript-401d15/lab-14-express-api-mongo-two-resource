'use strict';

const debug = require('morgan');
const Promise = require('bluebird');
const createError = require('http-errors');
const Minion = require('../models/minion.js');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


module.exports = exports = {};

exports.createMinion = function(minion){
  debug('#createMinion');
  if(!minion) return Promise.reject(createError(400, 'No minion; Minion required.'));
  return new Minion(minion).save();
};

exports.fetchMinion = function(id){
  debug('#fetchMinion');
  if(!id) return Promise.reject(createError(400, '!!No ID!! ID Required'));
  return Minion.findById(id);
};

exports.fetchMinions = function() {
  debug('#fetchMinions');
  return Minion.find({});
};

exports.updateMinion = function(id, minion){
  debug('#updateMinion');
  if(!id) return Promise.reject(createError(400, '!!No schema!! Schema Required'));
  if(!minion) return Promise.reject(createError(400, '!!no minion!! Minion Required'));
  return Minion.findByIdAndUpdate(id, minion, {new: true});
};


exports.deleteMinion = function(id){
  debug('#deleteMinion');
  if(!id) return Promise.reject(createError(400, '!!No id!!'));
  return Minion.findByIdAndRemove(id);
};
