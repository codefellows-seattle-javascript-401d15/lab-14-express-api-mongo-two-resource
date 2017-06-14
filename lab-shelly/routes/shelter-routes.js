'use strict';

const shelterController = require('../controller/shelter-controller');

module.exports = function(router) {

  router.get('/shelter/:id', (req, res) => {
    shelterController.fetchItem(req.params.id)
    .then(shelter => res.json(shelter))
    .catch(err => res.status(404).send(err.message));
  });

  router.get('/shelter', (req, res) => {
    shelterController.fetchAll()
    .then(shelter => res.json(shelter))
    .catch(err => res.status(404).send(err.message));
  });

  router.post('/shelter', (req, res) => {
    shelterController.createItem(req.body)
    .then(shelter => res.json(shelter))
    .catch(err => res.status(400).send(err.message));
  });
  router.put('/shelter/:id', (req, res) => {
    if(req.params.id) {
      shelterController.updateItem(req.params.id, req.body)
      .then(shelter => res.json(shelter))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.delete('/shelter/:id', (req, res) => {
    if(req.params.id) {
      shelterController.deleteItem(req.params.id)
      .then(err => res.status(204).send(err.message))
      .catch(err => res.status(404).send(err.message));
    }
  });
  return router;
};
