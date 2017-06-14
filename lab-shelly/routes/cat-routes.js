'use strict';

const catController = require('../controller/cat-controller');

module.exports = function(router) {

  router.get('/cat/:id', (req, res) => {
    if(req.params.id) {
      catController.fetchItem(req.params.id)
      .then(cat => res.json(cat))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.get('/cat', (req, res) => {
    catController.fetchAll()
    .then(cat => res.json(cat))
    .catch(err => res.status(404).send(err.message));
  });

  router.post('/shelter/:shelterId/cat', (req,res) => {
    if(req.params.shelterId) {
      catController.createItem(req.params.shelterId, req.body)
      .then(cat => res.json(cat))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.put('/cat/:id', (req,res) => {
    if(req.params.id) {
      catController.updateItem(req.params.id, req.body)
      .then(cat => res.json(cat))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.delete('/cat/:id', (req,res) => {
    if(req.params.id) {
      catController.deleteItem(req.params.id)
      .then(err => res.status(204).send(err.message))
      .catch(err => res.status(404).send(err.message));
    }
  });
  return router;
};
