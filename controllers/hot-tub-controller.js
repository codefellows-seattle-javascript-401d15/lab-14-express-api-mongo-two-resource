'use strict';

const HotTub = require('../models/hot-tubs');

module.exports = exports = {};

exports.makeTub = function(hotTub) {
  console.log('hotTub controller', hotTub);
  return new HotTub(hotTub).save();
};

exports.getATub = function(hotTub){
  return HotTub.findById(hotTub);
};

exports.getAllTubs = function() {
  return HotTub.find({});
};

exports.editTub = function(id, hotTub) {
  return HotTub.findByIdAndUpdate(id, hotTub, {new: true});
};

exports.drainTub = function(hotTub) {
  return HotTub.findByIdAndRemove(hotTub);
};
