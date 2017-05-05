'use strict';

const createError = require('http-errors');
const moveCtrl = require('../controllers/move-controller');

module.exports = function(router) {
  router.get('/move/:id', (req, res) => {
    if (!req.params.id) return res.status(400).send(createError(400, 'bad request'));
    moveCtrl.fetchMove(req.params.id)
    .then(move => {
      res.json(move);
    })
    .catch(err => res.status(400).send(err.message));
  });
  router.get('/move', (req, res) => {
    moveCtrl.fetchMovesList()
    .then(move => {
      res.json(move);
    })
    .catch(err => res.status(404).send(err.message));
  });
  router.post('/move', (req, res) => {
    moveCtrl.createMove(req.body)
    .then(move => {
      res.json(move);
    })
    .catch(err => res.status(400).send(err.message));
  });
  router.put('/move/:id', (req, res) => {
    if (!req.params.id) return res.status(400).send(createError(400, 'bad request'));
    if (!req.body.name && !req.body.attack && !req.body.power) return res.status(400).send(createError(400, 'must enter a property to update'));
    moveCtrl.updateMove(req.params.id, req.body)
    .then(move => {
      res.json(move);
    })
    .catch(err => res.status(404).send(err.message));
  });
  router.delete('/move/:id', (req, res) => {
    if (!req.params.id) return res.status(400).send(createError(400, 'bad request'));
    moveCtrl.deleteMove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => res.status(404).send(err.message));
  });
  return router;
};
