'use strict'

const Minion = require('./minion.js')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const summonerSchema = Schema({
  name: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
  minions: [{type: Schema.Types.ObjectId, ref: 'minion'}],
  ability: {type: String},
})

const Summoner = module.exports = mongoose.model('summoner', summonerSchema)
//chaining .then() is a good way to work asynchronously, and make it do multiple things
Summoner.findByIdAndAddMinion = function(id, minion){
  return Summoner.findById(id)//find a specific pet
  .then(summoner => {
    minion.summonerId = summoner._id//we're assigning the id of the pet to the person's  id
    this.tempSummoner = summoner //this is equal to the list returned from the db
    return new Minion(minion).save() //return the new Person after you save it to the db
  })//the data that we use for the next .then() is the data that was returned from the previous .then()
  .then(minion => {
    this.tempSummoner.minions.push(minion._id) //this is pushing this to *this* schema's array of ids
    this.tempMinion = minion
    return this.tempSummoner.save()
  })
  .then(() => this.tempMinion)
}
Summoner.findByIdAndRemoveMinion = function(id, minion){
  return Summoner.findById(id)//find a specific pet
  .then(summoner => {
    minion.summonerId = summoner._id//we're assigning the id of the pet to the person's  id
    this.tempSummoner = summoner //this is equal to the list returned from the db
    return new Minion(minion).save() //return the new Person after you save it to the db
  })//the data that we use for the next .then() is the data that was returned from the previous .then()
  .then(minion => {
    this.tempSummoner.minions.pop(minion._id) //this is pushing this to *this* schema's array of ids
    this.tempMinion = minion
    return this.tempSummoner.save()
  })
  .then(() => this.tempMinion)
}

// person => req.body = {
//   name: 'some name',
//   content: 'some content',
//   petId: 'some pet._id'
// }
//when you make a request from the database, it gives you a copy of that data,
//we are then modifying it, then overwriting it with .save()
