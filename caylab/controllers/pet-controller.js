'use strict';

const debug = require('morgan');
const Promise = require('bluebird');
const createError = require('http-errors');
const Pet = require('../models/pet.js');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = exports = {};

exports.createPet = function(pet){
  debug('#createPet');
  if(!pet) return Promise.reject(createError(400, 'Could you possibly have forgotton a pet in a *pet* request?'));
  return new Pet(pet).save();
};
