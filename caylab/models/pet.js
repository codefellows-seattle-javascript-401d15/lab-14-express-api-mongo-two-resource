'use strict';

const Person = require('./person.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = Schema({
  name: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
  people: [{type: Schema.Types.ObjectId, ref: 'person'}],
});

const Pet = module.exports = mongoose.model('pet', petSchema);
//chaining .then() is a good way to work asynchronously, and make it do multiple things
Pet.findByIdAndAddPerson = function(id, person){
  return Pet.findById(id)//find a specific pet
  .then(pet => {
    person.petId = pet._id;//we're assigning the id of the pet to the person's  id
    this.tempPet = pet; //this is equal to the list returned from the db
    return new Person(person).save(); //return the new Person after you save it to the db
  })//the data that we use for the next .then() is the data that was returned from the previous .then()
  .then(person => {
    this.tempPet.people.push(person._id); //this is pushing this to *this* schema's array of ids
    this.tempPerson = person;
    return this.tempPet.save();
  })
  .then(() => this.tempNote);
};

// person => req.body = {
//   name: 'some name',
//   content: 'some content',
//   petId: 'some pet._id'
// }
//when you make a request from the database, it gives you a copy of that data,
//we are then modifying it, then overwriting it with .save()
