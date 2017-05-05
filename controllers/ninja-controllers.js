'use strict';

const Ninja = require('../models/ninjas');

module.exports = exports = {};

exports.makeNinja = function(ninja) {
  console.log('ninja controller', ninja);
  return new Ninja(ninja).save();
};

exports.getANinja = function(ninja){
  return Ninja.findById(ninja);
};

exports.getAllNinjas = function() {
  return Ninja.find({});
};

exports.editNinja = function(id, ninja) {
  return Ninja.findByIdAndUpdate(id, ninja, {new: true});
};

exports.killNinja = function(ninja) {
  return Ninja.findByIdAndRemove(ninja);
};
