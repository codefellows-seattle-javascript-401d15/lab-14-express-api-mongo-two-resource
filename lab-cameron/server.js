'use strict';

// Module dependencies
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

// server instance refs
const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pokemon-env';

// routes
const pokemonRoutes = require('./routes/pokemon-routes')(router);
const moveRoutes = require('./routes/move-routes')(router);

// mongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// middleware/plugins
app.use(bodyParser);
app.use('/api', pokemonRoutes);
app.use('/api', moveRoutes);



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
