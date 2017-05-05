const Promise = require('bluebird');
const createError = require('http-errors');
const Vehicle = require('../model/vehicles');


module.exports = exports = {};


exports.createVehicle = function(req, res, car) {
  if(!car) return Promise.reject(createError(404, 'Car is required'));
  new Vehicle(req.body).save()
  .then(car => {
    res.json(car);
  })
  .catch(err => res.status(404).send(err.message));
};

exports.fetchVehicle = function(id, res) {
  if(!id) return Promise.reject(createError(400, 'ID is required'));
  return Vehicle.findById(id)
  .then(car => {
    console.log(car);
    res.json(car);
  })
  .catch(err => res.status(404).send(err.message));

};

exports.fetchAllVehicles = function(res) {
  return Vehicle.find()
  .then(car => res.json(car))
  .catch(err => res.status(400).send(err.message));
};

exports.deleteVehicle = function(req, res, id){
  if(!id) return Promise.reject(createError(400, 'ID is required'));

  Vehicle.findByIdAndRemove(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};

exports.putVehicle = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID is required'));

  Vehicle.findByIdAndUpdate(id, req.body, {new: true})
  .then(car => res.json(car))
  .catch(err => res.status(400).send(err.message));

};
