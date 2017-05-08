'use strict';

const express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3100;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/lureEnv';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const baitRoutes = require('./routes/bait-routes');
const lureRoutes = require('./routes/lure-routes');

app.use(bodyParser);
app.use(morgan('dev'));
app.use(router);

app.use('/api', baitRoutes);
app.use('/api', lureRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
