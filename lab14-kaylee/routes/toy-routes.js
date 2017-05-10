'use strict';

const toyCtrl = require('../controllers/toy-controller');

module.exports = function(router) {
  
  router.get('/toy/:id', (req, res) => {
    if(req.params.id) {
      toyCtrl.fetchOneToy(req.params.id)
      .then(toy => res.json(toy))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.get('/toy', (req, res) => {
    toyCtrl.fetchAllToys()
    .then(toys => res.json(toys))
    .catch(err => res.status(400).send(err.message));
  });
  router.post('/dog/:dogId/toy', (req, res) => {
    toyCtrl.createToy(req.params.dogId, req.body)
    .then(toy => res.json(toy))
    .catch(err => res.status(404).send(err.message));
  });
  router.put('/toy/:id', (req, res) => {
    if(req.params.id) {
      toyCtrl.updateToy(req.params.id, req.body)
      .then(toy => res.json(toy))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.delete('/toy/:id', (req, res) => {
    if(req.params.id) {
      toyCtrl.deleteToy(req.params.id)
      .then(toy => res.json(toy))
      .catch(err => res.status(404).send(err.message));
    }
  });
  return router;
};
