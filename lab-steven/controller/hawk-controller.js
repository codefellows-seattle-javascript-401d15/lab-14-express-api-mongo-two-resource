'use strict';

const Promise = require('bluebird');
const Seahawk = require('../model/seahawk');
const Defense = require('../model/defense');
const createError = require('http-errors');

module.exports = exports = {};

exports.createHawk = function(defId, hawk){
  if(!defId) return Promise.reject(createError(400, 'defense id required'));
  if(!hawk) return Promise.reject(createError(400, 'hawk required'));
  return Defense.findByIdAndAddHawk(defId, hawk)
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.readHawk = function(id){
  if(!id) return Promise.reject(createError(400, 'id required'));
  return Seahawk.find(id)
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateHawk = function(id, hawkUp){
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!hawkUp) return Promise.reject(createError(400, 'hawk updates required'));
  return Seahawk.update(id, hawkUp)
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteHawk = function(hawkId){
  if (!hawkId) return Promise.reject(createError(400, 'hawkId required'));
  return Seahawk.find(hawkId)
  .then(hawk => {
    return Defense.findByIdAndRemoveHawk(hawk.defId, hawkId);
  })
  .then(data => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};
