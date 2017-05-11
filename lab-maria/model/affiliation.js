'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gem = require('./gem');

const affSchema = Schema({
  name: {type: String, required: true},
  leader: {type: String, required: true},
  gems: [{type: Schema.Types.ObjectId, ref: 'gem'}],
});

const Affiliation = module.exports = mongoose.model('aff', affSchema);

Affiliation.findAndAddGem = function(aff, gem) {
  return Affiliation.find({id: aff.id})
  .then(aff => {
    gem.affID = aff.id;
    this.tempAff = aff;
    return new Gem(gem).save();
  })
  .then(gem => {
    this.tempAff[0].gems.push(gem._id); //this.tempAff is an object inside an array
    this.tempGem = gem;
    return this.tempAff[0].save();
  })
  .then(() => this.tempGem)
  .catch(err => Promise.reject(err));
};
