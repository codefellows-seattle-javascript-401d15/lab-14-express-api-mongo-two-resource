'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/foodEnv';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require('./routes/food-routes')(router);

app.use(bodyParser);
app.use(router);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
