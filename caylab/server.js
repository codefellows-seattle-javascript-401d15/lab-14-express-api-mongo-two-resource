'use strict';

//module dependencies
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();

//server instance refs
const app = module.exports = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/person-env';

//routes
const petRoutes = require('./routes/pet-routes.js')(router);
const personRoutes = require('./routes/person-routes.js')(router);

// require('./routes/person-routes.js')(router);
// require('./routes/pet-routes.js')(router);

//promisify
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


//prefix so you don't have to enter the /api/ every time you're doing things
app.use(bodyParser);
app.use('/api', petRoutes);
app.use('/api', personRoutes);


app.listen(PORT, () => console.log(`Listening in on port: ${PORT}`));
