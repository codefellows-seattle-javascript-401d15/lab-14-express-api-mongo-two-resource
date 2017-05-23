'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listItem = require('./note')

const listSchema = Schema({
  name: {type: String, required: true},
  time: {type: Date, default: Date.now},
  listItems: [{type: Schema.Types.ObjectId, ref: 'listItem'}]
})

const List = module.exports = mongoose.model('list', listSchema)

List.findByIdAndAddListItem = function(id, listItem) {
  return List.findById(id)
  .then(list => {
    console.log(list);
    listItem.listId = list._id
    this.tempList = list
    return new ListItem(listItem).save()
  })
  .then(listItem => {
    this.tepmList.listItem.push(listItem._id)
    this.tempListItem = listItem
    return this.tempList.save()
  })
  .then(() => this.tempListItem)
  .catch(err => Promise.reject(err))
}
