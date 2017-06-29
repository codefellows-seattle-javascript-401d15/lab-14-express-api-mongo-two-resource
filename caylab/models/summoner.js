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
Summoner.findByIdAndAddMinion = function(id, minion){
  return Summoner.findById(id)
  .then(summoner => {
    minion.summonerId = summoner._id
    this.tempSummoner = summoner
    return new Minion(minion).save()
  })
  .then(minion => {
    this.tempSummoner.minions.push(minion._id)
    this.tempMinion = minion
    return this.tempSummoner.save()
  })
  .then(() => this.tempMinion)
}
Summoner.findByIdAndRemoveMinion = function(id, minion){
  return Summoner.findById(id)
  .then(summoner => {
    minion.summonerId = summoner._id
    this.tempSummoner = summoner
    return new Minion(minion).save()
  })
  .then(minion => {
    this.tempSummoner.minions.pop(minion._id)
    this.tempMinion = minion
    return this.tempSummoner.save()
  })
  .then(() => this.tempMinion)
}
