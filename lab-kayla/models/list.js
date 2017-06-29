'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Note = require('./note')

const listSchema = Schema({//eslint-disable-line
  name: {type: String, required: true},
  time: {type: Date, default: Date.now},
  notes: [{type: Schema.Types.ObjectId, ref: 'note'}]

})

const List = module.exports = mongoose.model('list', listSchema)

List.findByIdAndAddNote = function(id, note) {
  return List.findById(id)
  .then(list => {
    note.listId = list._id
    this.tempList = list
    return new Note(note).save()
  })
  .then(note => {
    this.tepmList.note.push(note._id)
    this.tempNote = note
    return this.tempList.save()
  })
  .then(() => this.tempNote)

  .catch(err => Promise.reject(err))
}
