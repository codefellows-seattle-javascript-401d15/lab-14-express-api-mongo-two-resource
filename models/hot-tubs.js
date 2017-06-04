'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ninja = require('./ninjas');

const hotTubSchema = Schema({
  model: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
  ninjas: [{type: Schema.Types.ObjectId, ref: 'ninjas'}],
});

const HotTub = module.exports = mongoose.model('hotTub', hotTubSchema);

HotTub.findByIdAndAddNinja = function(id, ninja) {
  return HotTub.findById(id)
  .then(tub => {
    console.log(tub);
    ninja.tubID = tub._id;
    this.dryHotTub = tub;
    return new Ninja(ninja).save();
  })
  .then(ninja => {
    this.dryHotTub.ninjas.push(ninja._id);
    this.tempNinja = ninja;
    return this.dryHotTub.save();
  })
  .then(() => {
    this.tempNinja;
  })
  .catch(err => Promise.reject(err));
};
