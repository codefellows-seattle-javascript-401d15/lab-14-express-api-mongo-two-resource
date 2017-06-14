'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const morgan = require('morgan');
const bodyParser = require('body-parser').json();

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/shelter-dev';

const catRoutes = require('./routes/cat-routes')(router);
const shelterRoutes = require('./routes/shelter-routes')(router);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser);
app.use('/api', catRoutes);
app.use('/api', shelterRoutes);
app.use(morgan('dev'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
