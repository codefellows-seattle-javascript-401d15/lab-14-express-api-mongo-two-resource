'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

const app = module.exports = express();
const router = express.Router();//eslint-disable-line
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/list-dev';

const noteRoutes = require('./routes/note.js')(router);
const listRoutes = require('./routes/list.js')(router);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser);
app.use('/api', noteRoutes);
app.use('api', listRoutes);

app.listen(PORT, () => console.log(`Stalking port ${PORT}`));
