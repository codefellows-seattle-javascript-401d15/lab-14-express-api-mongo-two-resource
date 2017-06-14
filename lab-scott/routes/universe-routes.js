'use strict';

const Universe = require('../models/universe');

module.exports = function(router) {
  router.get('/universe/:id', (req,res) => {
    Universe.findById(req.params.id)
      .populate('planets')
      .then(universe => res.json(universe))
      .catch(err => res.status(404).send(err.message));
  });

  router.post('/universe', (req,res) => {
    new Universe(req.body).save()
      .then(universe => res.json(universe))
      .catch(err => res.status(400).send(err.message));

  });

  router.put('/universe/:id', (req,res) => {

  });

  router.delete('/universe/:id', (req,res) => {

  });

  return router;
};
