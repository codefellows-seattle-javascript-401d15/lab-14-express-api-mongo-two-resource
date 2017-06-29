'use strict';

//module dependencies
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

//server instance refs
const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/minion-env';

//routes
const summonerRoutes = require('./routes/summoner-routes.js')(router);
const minionRoutes = require('./routes/minion-routes.js')(router);

//promisify
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


//prefix so you don't have to enter the /api/ every time you're doing things
app.use(bodyParser);
app.use('/api', summonerRoutes);
app.use('/api', minionRoutes);


app.listen(PORT, () => console.log(`Listening in on port: ${PORT}`));
