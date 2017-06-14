'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = Schema ({
  title: {type: String, required: true},
  genre: {type: String},
  gameConsoleId: {type: Schema.Types.objectId},
});

module.exports = mongoose.model('game', gameSchema);
