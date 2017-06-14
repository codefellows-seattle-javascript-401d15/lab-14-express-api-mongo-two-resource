'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Car = require('./car');

const rigSchema = Schema({
  driver: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
  comments: [{type: Schema.Types.ObjectId, ref: 'note'}],
});

const Rig = module.exports = mongoose.model('rig', rigSchema);

Rig.findByIdAndAddCar = function(id, car){
  return Rig.findById(id)
  .then(rig => {
    console.log(rig);
    car.rigId = rig._id;
    this.tempRig = rig;
    return new Car(car).save();
  })
  .then(car => {
    this.tempRig.cars.push(car._id);
    this.tempCar = car;
    return this.tempRig.save();
  })
  .then(() => this.tempCar)
  .catch(err => Promise.reject(err));
};
