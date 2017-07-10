'use strict';

//Module dependencies
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

//Server instance references
const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/gallery-db';

//Routes
const galleryRoutes = require('./routes/gallery-routes.js')(router);
const photoRoutes = require('./routes/photo-routes.js')(router);

//MongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//Middleware Plugins
app.use(bodyParser);
app.use('/api', galleryRoutes);
app.use('/api', photoRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
