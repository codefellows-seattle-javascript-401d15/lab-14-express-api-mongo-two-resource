'use strict';

const ctrlNinja = require('../controllers/ninja-controllers');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/api/ninja', (req, res) => {
    // console.log(req);
    console.log(req.body);
    ctrlNinja.makeNinja(req.body)
    .then(ninja => {
      console.log(ninja);
      res.json(ninja);
    })
    .catch(err => res.status(404).send(err));
  });

  router.put('/api/ninja/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400, 'Horrible request, the WORST!'));
    if(!req.body.name && !req.body.clan && !req.body.weapons) return res.status(400).send(createError(400, 'UPDATE the properties, stupid!'));
    ctrlNinja.editNinja(req.params.id, req.body)
    .then(ninja => {
      console.log(ninja);
      res.json(ninja);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.get('/api/ninja/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400, 'Ninja too stealthy.'));
    ctrlNinja.getANinja(req.params.id)
    .then(ninja => {
      console.log(ninja);
      res.json(ninja);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/ninja', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400, 'Ninja too stealthy.'));
    ctrlNinja.getAllNinjas()
    .then(ninja => {
      console.log(ninja);
      res.json(ninja);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/ninja', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError(400, 'Christ almighty... Seriously, how do you even FUNCTION(?)'));
    if(!req.body.name && !req.body.clan && !req.body.weapons) return res.status(400).send(createError(400, 'Your ninja doesn\'t exist. Or does he...?'));
    ctrlNinja.killNinja(req.params.id)
    .then(() => {
      console.log('Ninja Killed');
      res.status(204).send();
    })
    .catch(err => res.status(404).send(err.message));
  });


};
