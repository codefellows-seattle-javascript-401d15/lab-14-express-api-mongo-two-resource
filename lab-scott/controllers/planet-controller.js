'use strict';

// const mkdirp = require('mkdirp-promise');
// const createError = require('http-errors');
const Planet = require('../models/planet');


module.exports = exports = {};

exports.createItem = function(planet) {
  // if(!planet || !planet.name || !planet.universe) return Promise.reject(createError(400, 'Planet with name and universe required'));

  return new Planet(planet).save();

  // return mkdirp(`${__dirname}/../db`)
  //   .then((planet) => new Planet(planet).save())
  //   .catch(err => err.message);
};

exports.fetchItem = function(id) {
  // if(!id) return Promise.reject(createError(400, 'id required'));

  return Planet.findById(id);
};

exports.updateItem = function(id, planet){
  return Planet.findByIdAndUpdate(id, {
    $set: {
      name:planet.name,
      universe:planet.universe,
    },
  }, {new: true});
};

exports.deleteItem = function(schema, id){
  return Planet.findByIdAndRemove(id);
};
