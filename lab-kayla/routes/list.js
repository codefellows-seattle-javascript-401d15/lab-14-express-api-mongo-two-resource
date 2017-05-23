'use strict';

const List = require('../models/list');

module.exports = function(router) {
  router.get('/list/:id', (req, res) => {
    List.findById(req.params.id)
    .poulate('notes');
    .then(list => res.json(list))
    .catch(err => res.status(404).send(err.message))
  })
  router.get('/list', (req, res) => {

  })
}
