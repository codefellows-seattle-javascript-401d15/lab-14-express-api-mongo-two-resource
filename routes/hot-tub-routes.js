'use strict';

const ctrlTub = require('../controllers/hot-tubs');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/api/hottub', (req, res) => {
    console.log('TUB BODY ', req.body);
    ctrlTub.makeTub(req.body)
    .then(tub => {
      console.log(tub);
      res.json(tub);
    })
    .catch(err => res.status(404).send(err));
  });

  router.get('/api/hottub/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400, 'No Hot Tub Found'));
    ctrlTub.getATub(req.params.id)
    .then(tub => {
      console.log(tub);
      res.json(tub);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.get('/api/hottub/', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400, 'No Hot Tubs Found'));
    ctrlTub.getAllTubs()
    .then(tub => {
      console.log(tub);
      res.json(tub);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.put('/api/hottub/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400, 'Horrible request, the WORST!'));
    if(!req.body.model && !req.body.timeStamp && !req.body.ninjas) return res.status(400).send(createError(400, 'UPDATE the properties, stupid!'));
    ctrlTub.editNinja(req.params.id, req.body)
    .then(tub => {
      console.log(tub);
      res.json(tub);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/hottub/', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400), 'Hot Tub Cannot be deleted');
    if(!req.body.model) return  res.status(400).send(createError(400, 'Your Tub does not exist.'));
    ctrlTub.drainTub(req.params.id)
    .then(() => {
      console.log('tub drained');
      res.status(204).send();
    })
    .catch(err => res.status(404).send(err.message));
  });





};
