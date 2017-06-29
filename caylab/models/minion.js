'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const minionSchema = Schema({
  name: {type: String, required: true},
  ability: {type: String, default: 'none'},
  summonerId: {type: Schema.Types.ObjectId},
})

module.exports = mongoose.model('minion', minionSchema)
