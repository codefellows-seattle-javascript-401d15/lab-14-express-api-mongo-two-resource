'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Vehicles = require('../model/vehicles');
const Car = require('../model/car');

module.exports = exports ={};


exports.findByIdAndAddNote =  function(id, car){
  return Vehicles.findById(id)
  .then(vehicle =>{
    console.log(vehicle);
    car.vehicleId = vehicle._id;

    this.tempvehicles = vehicle;
    return new Car(car).save();
  })
  .then(car =>{
    this.tempvehicles.cars.push(car._id);
    this.tempCar = car;
    return this.tempvehicles.save();
  });
};
exports.createVehicles = function(req, res){
  new Vehicles(req.body).save()
  .then(vehicle => {
    res.json(vehicle);
  });
};
