
'use strict';

const Aff = require('../model/affiliation');

module.exports = function(router) {
  router.get('/aff/:id', (req, res) => {
    Aff.findById(req.params.id)
      .populate('gems')
      .then(aff => {
        if(aff.length === 0) err => res.status(404).send(err.message);
        res.json(aff);
      })
      .catch(err => res.status(404).send(err.message));
  });
  router.get('/aff', (req, res) => {
    Aff.find().populate('gems')
      .then(aff => res.json(aff))
      .catch(err => res.status(404).send(err.message));
  });
  router.post('/aff', (req, res) => {
    new Aff(req.body).save()
    .then(aff => res.json(aff))
    .catch(err => res.status(400).send(err.message));
  });
  router.put('/aff/:id', (req, res) => {
    if(req.params.id) {
      Aff.findById(req.params.id, function(err, aff) {
        if(err) res.status(500).send(err.message);
        aff.name = req.body.name ||  aff.name;
        aff.leader = req.body.leader || aff.leader;
        aff.save()
          .then(aff => res.json(aff))
          .catch(err => res.status(500).send(err.message));
      });
    }
  });

  router.delete('/aff/:id', (req, res) => {
    if(!req.params.id) err => res.status(500).send(err.message);
    Aff.findByIdAndRemove(req.params.id)
      .then(res.sendStatus(200))
      .catch(err => res.status(500).send(err.message));
  });
  return router;
};
