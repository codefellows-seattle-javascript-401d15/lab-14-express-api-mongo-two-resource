'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Note = require('../models/note.js');
const List = require('../models/list.js');

module.exports = exports = {};

exports.createNote = function(listId, note, res) {
  if(!note) return Promise.reject(createError(400, 'List required'));

  List.findByIdAndAddNote(listId, note)
  .then(newNote => {
    res.json(newNote);
    console.log('new note', newNote);
  })
  .catch(() => Promise.reject(createError(500, 'Error saving note in mongo')));
};

exports.fetchNote = function(listId, noteId, res) {
  if(!listId) return Promise.reject(createError(400, 'List ID required'));

  List.findListAndFindNote(listId, noteId)
  .then(fetchedNote => {
    console.log('fetched note', res.json(fetchedNote));
    return fetchedNote;
  })
  .catch(() => Promise.reject(createError(500, 'Error getting note from mongo')));
};

exports.updateNote = function(noteId, req, res) {
  if(!noteId) return Promise.reject(createError(400, 'Note ID required'));

  Note.findOneAndUpdate(noteId, req.body, {new: true})
  .then(note => res.json(note))
  .catch(err => res.status(400).send(err.message));
};

exports.removeNote = function(noteId, req, res) {
  if(!noteId) return Promise.reject(createError(400, 'Note ID required'));

  Note.findByIdAndRemove(noteId)
    .then(() => res.status(204).send())
    .catch(err => res.send(err));
};
