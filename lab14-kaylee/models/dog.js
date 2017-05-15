'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Toy = require('./toy');

const dogSchema = Schema({
  name: {type: String, required: true},
  breed: {type: String, required: true},
  toys: [{type: Schema.Types.ObjectId, ref: 'toy'}],
});

const Dog = module.exports = mongoose.model('dog', dogSchema);

Dog.findByIdAndAddToy = function(id, toy) {
  return Dog.findById(id)
  .then(dog => {
    toy.dogId = dog._id;
    this.tempDog = dog;
    return new Toy(toy).save();
  })
  .then(toy => {
    this.tempDog.toys.push(toy._id);
    this.tempToy = toy;
    return this.tempDog.save();
  })
  .then(() => this.tempToy)
  .catch(err => Promise.reject(err));
};
