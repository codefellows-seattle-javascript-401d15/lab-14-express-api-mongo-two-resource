'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/minion-env';

const summonerRoutes = require('./routes/summoner-routes.js')(router);
const minionRoutes = require('./routes/minion-routes.js')(router);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser);
app.use('/api', summonerRoutes);
app.use('/api', minionRoutes);

app.listen(PORT, () => console.log(`Listening in on port: ${PORT}`));
