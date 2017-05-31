const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Car = require('./car');

const vehicleSchema = Schema({
  name: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
  cars: [{type: Schema.Types.ObjectId, ref: 'car'}],
});

const Vehicle = module.exports = mongoose.model('Vehicle', vehicleSchema);

Vehicle.findByIdAndAddCar = function(id, car) {
  return Vehicle.findById(id)
  .then(vehicle => {
    car.vehicleId = vehicle._id;
    this.tempVehicle = vehicle;
    return new Car(car).save();
  })
  .then(car => {
    this.tempVehicle.cars.push(car._id);
    this.tempCar = car;
    return this.tempVehicle.save();
  })
  .then(() => this.tempCar)
  .cath(err => Promise.reject(err));
};
