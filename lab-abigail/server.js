'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/recipeEnv';


const foodRoutes = require('./routes/food-routes')(router);
const recipeRoutes = require('./routes/recipe-routes')(router);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser);
app.use('/api', foodRoutes);
app.use('/api', recipeRoutes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
