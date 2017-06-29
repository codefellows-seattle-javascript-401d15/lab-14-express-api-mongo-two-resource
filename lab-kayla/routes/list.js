'use strict';

const List = require('../models/list');

// const listCtrl = require('../controllers/list-control')

module.exports = function(router) {
  router.get('/list/:id', (req, res) => {
    List.findById(req.params.id)
    .poulate('notes')
    .then(list => res.json(list))
    .catch(err => res.status(404).send(err.message))
  })

  router.post('/list', (req, res) => {
    new List(req.body).save()
    .then(list => res.json(list))
    .catch(err => res.status(400).send(err.message))
  })
  // router.put('/list', (req, res) => {
  //
  // })
  // router.delete('/list/:id', (req, res) => {
  //
  // })
  return router
}
