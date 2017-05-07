'use strict';

const debug = require('morgan');
const Promise = require('bluebird');
const createError = require('http-errors');
const Summoner = require('../models/summoner.js');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

exports.createSummoner = function(summoner){
  debug('#createSummoner');
  if(!summoner) return Promise.reject(createError(400, 'Could you possibly have forgotton a summoner in a *summoner* request?'));
  return new Summoner(summoner).save();
};

exports.fetchSummoner = function(id){
  debug('#fetchSummoner');
  if(!id) return Promise.reject(createError(400, 'You forgot a target summoner id'));
  return Summoner.findById(id);
};

exports.fetchSummoners = function(){
  debug('#fetchSummoners');
  return Summoner.find({});
};

exports.updateSummoner = function(id, summoner){
  debug('#updateSummoner');
  if(!id) return Promise.reject(createError(400, '!!No id!!'));
  if(!summoner) return Promise.reject(createError(400, '!!No summoner!!'));
  return Summoner.findByIdAndUpdate(id, summoner, {new: true});
};

exports.deleteSummoner = function(id){
  debug('#deleteSummoner');
  if(!id) return Promise.reject(createError(400, '!!no id!!'));
  return Summoner.findByIdAndRemove(id);
};
