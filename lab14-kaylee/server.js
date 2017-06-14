'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dogToysDB';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const toyRoutes = require('./routes/toy-routes')(router);
const dogRoutes = require('./routes/dog-routes')(router);

app.use(bodyParser);
app.use('/api', toyRoutes);
app.use('/api', dogRoutes);

app.listen(PORT, () => console.log(`Listening on PORT, ${PORT}!`));
