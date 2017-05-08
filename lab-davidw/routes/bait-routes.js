'use strict';

const baitCtrl = require('../controllers/bait-controller');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/bait', (req, res) => {

    baitCtrl.createBait(req, res)
    .then(bait => {
      res.send(bait);
    });
  });

  router.get('/bait/id:', (req, res) => {

    if(!req.params.id) return res.status(400).send(createError('Bad Request, id required.'));
    baitCtrl.fetchBait(req.params.id)
    .then(bait => {
      res.json(bait);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.get('/bait/', (req, res) => {

    baitCtrl.fetchAllBaits()
    .then(bait => {
      res.json(bait);
    });
  });

  router.put('/bait/:id', (req, res) => {
    baitCtrl.updateBait(req, res, req.params.id, req.body);
  });

  router.delete('/bait/:id', (req, res) => {
    baitCtrl.deleteBait(req.params.id, res);
  });
};
