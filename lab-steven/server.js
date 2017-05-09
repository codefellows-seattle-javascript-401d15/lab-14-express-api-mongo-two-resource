'use strict';

const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json();
const morgan = require('morgan');

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dbhawk';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const defRoutes = require('./routes/def-routes')(router);
const hawkRoutes = require('./routes/hawk-routes')(router);
app.use(bodyParser);
app.use(morgan('dev'));

app.use('/api', defRoutes);
app.use('/api', hawkRoutes);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
