'use strict';
const createError = require('http-errors');
const Promise = require('bluebird');
const List = require('../models/list.js');

module.exports = exports = {};

exports.createList = function(req, res, list) {
  if(!list) return Promise.reject(createError(400, 'List required'));

  new List(req.body).save()
  .then(list => res.json(list))
  .catch(err => res.status(400).send(err.message));
};

exports.fetchList = function(id, res) {
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return List.findById(id)
  .then(list => {
    res.json(list);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchAllLists = function(res) {
  return List.find()
  .then(list => res.json(list))
  .catch(err => res.status(400).send(err.message));
};

exports.updateList = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));

  List.findOneAndUpdate(id, req.body, {new: true})
  .then(list => res.json(list))
  .catch(err => res.status(400).send(err.message));
};

exports.removeList = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));

  List.deleteOne(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};
