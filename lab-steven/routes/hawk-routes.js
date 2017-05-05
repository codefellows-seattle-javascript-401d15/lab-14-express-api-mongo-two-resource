'use strict';

const hawkCtrlr = require('../controller/hawk-controller');

module.exports = function(router){

  router.get('/hawk/:id', (req, res) => {
    hawkCtrlr.readHawk({ '_id' : `${req.params.id}`})
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

//getall
  router.get('/hawk', (req, res) => {
    hawkCtrlr.readHawk({})
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

  router.post('/def/:id/hawk', (req, res) => {
    hawkCtrlr.createHawk(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/hawk/:id', (req, res) => {
    hawkCtrlr.updateHawk({ '_id' : `${req.params.id}`}, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/hawk/:id', (req, res) => { //should also delete hawk id from Def.hawks
    hawkCtrlr.deleteHawk({ '_id' : `${req.params.id}`})
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).send(err.message));
  });
  return router;
};
