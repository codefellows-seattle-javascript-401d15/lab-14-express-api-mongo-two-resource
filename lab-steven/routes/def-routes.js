'use strict';

const defCtrlr = require('../controller/defense-controller');

module.exports = function(router){
  router.get('/def/:id', (req, res) => {
    defCtrlr.readDef({ '_id' : `${req.params.id}`})
    .then(def => res.json(def))
    .catch(err => res.status(404).send(err.message));
  });
  //getall

  router.get('/def', (req, res) => {
    defCtrlr.readDef({})
    .then(def => res.json(def))
    .catch(err => res.status(404).send(err.message));
  });

  router.post('/def', (req, res) => {
    defCtrlr.createDef(req.body)
    .then(def => res.json(def))
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/def/:id', (req, res) => {
    defCtrlr.updateDef({ '_id' : `${req.params.id}`}, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.message));
  });

  router.delete('/def/:id', (req, res) => {
    defCtrlr.deleteDef({ '_id' : `${req.params.id}`})
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).send(err.message));
  });

  return router;
};
