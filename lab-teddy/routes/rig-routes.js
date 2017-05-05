'use strict';

const Rig = require('../models/rig');

module.exports = function(router) {
  router.get('/rig/:id', (req, res) => {
    Rig.findById(req.params.id)
    .populate('cars')
    .then(rig => res.json(rig))
    .catch(err => res.status(404).send(err.message))
  });
  router.post('/rig', (req, res) => {
    new Rig(req.body).save()
    .then(rig => res.json(rig))
    .catch(err => res.status(404).send(err.message));
  });
  router.put('/list', (req, res) => {
    Rig.findByIdAndUpdate(req.params.id, )
  })
}
