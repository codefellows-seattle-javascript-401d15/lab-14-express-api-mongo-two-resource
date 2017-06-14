'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Recipe = require('../model/recipe-model');

module.exports = exports = {};

exports.createItem = function(req, res, recipe) {

  if(!recipe) return Promise.reject(createError(400, 'bad requst'));

  new Recipe(req.body).save()
  .then(recipe => {
    res.json(recipe);
  })
  .catch(err => res.status(400).send(err.message));
};


exports.updateItem = function(req, res, id, recipe) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Recipe.findByIdAndUpdate(id, recipe, {new: true})
  .then(recipe => {
    res.json(recipe);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchItem = function(id, res) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Recipe.findById(id)
  .then(recipe => {
    res.json(recipe);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.deleteItem = function(id, res) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Recipe.findByIdAndRemove(id)
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => res.status(404).send(err.message));
};
