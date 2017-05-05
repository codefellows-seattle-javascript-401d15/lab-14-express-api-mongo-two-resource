'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Car = require('../model/car');

module.exports = exports = {};


exports.createCar = function(req, res, car) {
  if(!car) return Promise.reject(createError(404, 'Car is required'));
  new Car(req.body).save()
  .then(car => {
    res.json(car);
  })
  .catch(err => res.status(404).send(err.message));
};

exports.fetchCar = function(id, res) {
  if(!id) return Promise.reject(createError(400, 'ID is required'));
  return Car.findById(id)
  .then(car => {
    console.log(car);
    res.json(car);
  })
  .catch(err => res.status(404).send(err.message));

};

exports.fetchAllCars = function(res) {
  return Car.find()
  .then(car => res.json(car))
  .catch(err => res.status(400).send(err.message));
};

exports.deleteCar = function(req, res, id){
  if(!id) return Promise.reject(createError(400, 'ID is required'));

  Car.findByIdAndRemove(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};

exports.putCar = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID is required'));

  Car.findByIdAndUpdate(id, req.body, {new: true})
  .then(car => res.json(car))
  .catch(err => res.status(400).send(err.message));

};
