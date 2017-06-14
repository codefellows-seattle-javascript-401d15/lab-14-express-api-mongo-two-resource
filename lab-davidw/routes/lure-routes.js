'use strict';

const lureCtrl = require('../controllers/lure-controller');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/lure', (req, res) => {

    lureCtrl.createLure(req, res)
    .then(lure => {
      res.json(lure);
    });
  });

  router.get('/lure/', (req, res) => {

    lureCtrl.fetchAllLures()
    .then(lure => {
      res.json(lure);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.get('/lure/:id', (req, res) => {

    if(!req.params.id) return res.status(400).send(createError('Bad Request, id required.'));
    lureCtrl.fetchLure(req.params.id)
    .then(lure => {
      res.json(lure);
    })
    .catch(err => res.status(404).send(err.mesasge));
  });

  router.put('/lure/', (req, res) => {
    lureCtrl.updateLure(req, res, req.params.id, req.body);
  });

  router.delete('/lure/:id', (req, res) => {
    lureCtrl.deleteLure(req.params.id, res);
  });

};
