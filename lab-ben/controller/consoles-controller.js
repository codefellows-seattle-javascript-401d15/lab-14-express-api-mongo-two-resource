'use strict';

const Hardware = require('../model/consoles.js');

module.exports = exports = {};

exports.createItem = function(body) {
  new Hardware(body).save();
};

exports.findItem = function(id) {
  Hardware.findById(id);
};

exports.findAll = function() {
  Hardware.find();
};

exports.updateItem = function(id, body) {
  Hardware.update({id: id}, {$set: {
    name: body.name,
    manufacturer: body.manufacturer,
    releaseYear: body.releaseYear,
  }});
};

exports.removeItem = function(id) {
  Hardware.remove({id: id});
};
