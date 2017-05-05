'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hawk = require('./seahawk');

const DefSchema = Schema({
  name : String,
  hawks : [{type: Schema.Types.ObjectId, ref: 'hawk' }],
});

const Defense = module.exports = mongoose.model('defense', DefSchema);

Defense.findByIdAndAddHawk = function(id, hawk){ //need def id and hawk(which is req.body)
  return Defense.findById(id)
  .then(defense => {
    hawk.defId = defense._id;
    this.tempDef = defense;
    return new Hawk(hawk).save();
  })
  .then(hawk => {
    this.tempDef.hawks.push(hawk._id);
    this.tempHawk = hawk;
    return this.tempDef.save();
  })
  .then(() => Promise.resolve(this.tempHawk))
  .catch(err => Promise.reject(err));
};

Defense.findByIdAndRemoveHawk = function(defId, hawkId){
  //code this: should find defense, remove hawk id from hawks, and remove the hawk

};
