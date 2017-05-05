'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

//const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cars-env'; //mongo protocol
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/list-dev';

const carRoutes = require('./routes/car-routes')(router);
const vehicleRoutes = require('./routes/vehicle-routes')(router);

mongoose.Promise = Promise; //allows for .then and .catch instead of callbacks
mongoose.connect(MONGODB_URI);


app.use(bodyParser);
app.use('/api', carRoutes);
app.use('/api', vehicleRoutes);

app.listen(PORT,() => console.log(`Listening on PORT ${PORT}`));
