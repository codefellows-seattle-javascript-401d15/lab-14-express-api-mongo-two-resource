'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Defense = require('./defense');

const HawkSchema = Schema({
  name: {type: String, required: true},
  pos: {type: String, required: true},
  defId: {type: Schema.Types.ObjectId, required: true},
});

const Seahawk = module.exports = mongoose.model('hawk', HawkSchema);

Seahawk.findAndRemoveDef = function(defenseId) {
//find hawks from defense.hawks, remove hawk.defId for affected hawks, remove defense
  console.log(defenseId, 'from hawkModel***************');
  return Defense.remove({ '_id': defenseId })
  .then(() => Seahawk.updateMany({ 'defId' : defenseId }, { 'defId' : null }))
  .catch(err => Promise.reject(err));
};
