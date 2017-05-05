'use strict';

const createError = require('http-errors');
const Pet = require('../models/pet.js');
const petCtrl = require('../controllers/pet-controller.js');

module.exports = function(router){
  router.get('/pet/:id', (req, res) => {//get one
    if(!req.params.id) return res.status(400).send(createError('You too stupid to find a pet, boy?'))
  });
  router.get('/pet', (req, res) => {

  });

  //===========================================
  router.post('/pet', (req, res) => {
    petCtrl.createPet(req.body)
    .then(pet => res.json(pet))
    .catch(err => res.status(400).send(err.message));
  });

  //===========================================
  router.put('/pet', (req, res) => {

  });

  //===========================================
  router.delete('/pet/:id', (req, res) => {

  });

  return router;
};
