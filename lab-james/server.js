'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/game-routes.js');
const consoleRoutes = require('./routes/console-routes.js');

const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mogodb://localhost/console-dev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser);
app.use('/api', consoleRoutes);
app.use('/api', gameRoutes);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
