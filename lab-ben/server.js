'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const mongoose = require('mongoose');
const Promise = require('bluebird');

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/consoles-env';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(jsonParser);
app.use(morgan('dev'));

require('./routes/consoles-routes.js')(router);
app.use(router);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));

//Done here for proper testing
module.exports = app;
