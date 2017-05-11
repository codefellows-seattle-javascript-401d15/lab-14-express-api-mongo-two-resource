'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const jsonParser = require('body-parser').json();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/note-env';

const gemRoutes = require('./routes/gem-routes')(router);
const affRoutes = require('./routes/aff-routes')(router);
app.use(jsonParser);
app.use('/api', gemRoutes);
app.use('/api', affRoutes);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.listen(PORT, () => console.log(`Listening on port, ${PORT}`));

module.exports = app;
