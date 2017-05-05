'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Food = require('../model/food-model');
const Recipe = require('../model/recipe-model');


module.exports = exports = {};

exports.createItem = function(req, res, id, food) {

  if(!food) return Promise.reject(createError(400, 'bad requst'));

  Recipe.findByIdAndAddFood(id, food)
  .then(food => {
    res.json(food);
  })
  .catch(err => res.status(400).send(err.message));
};


exports.updateItem = function(req, res, id, food) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Food.findByIdAndUpdate(id, food, {new: true})
  .then(food => {
    res.json(food);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchItem = function(id, res) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Food.findById(id)
  .then(food => {
    res.json(food);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.deleteItem = function(id, res) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Food.findByIdAndRemove(id)
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => res.status(404).send(err.message));
};
