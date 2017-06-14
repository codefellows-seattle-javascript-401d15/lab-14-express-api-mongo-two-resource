'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cat = require('./cat');

const shelterSchema = Schema({
  name: {type: String, required: true},
  neighborhood: {type: String, required: true},
  cats: [{type: Schema.Types.ObjectId, ref: 'cat'}],
});

const Shelter = module.exports = mongoose.model('shelter', shelterSchema);

Shelter.findByIdAndAddCat = function(id, cat) {
  return Shelter.findById(id)
  .then(shelter => {
    cat.shelterId = shelter._id;
    this.tempShelter = shelter;
    return new Cat(cat).save();
  })
  .then(cat => {
    this.tempShelter.cats.push(cat._id);
    this.tempCat = cat;
    return this.tempShelter.save();
  })
  .then(() => this.tempCat)
  .catch(err => Promise.reject(err));
};
