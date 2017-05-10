'use strict';

const dogCtrl = require('../controllers/dog-controller');

module.exports = function(router) {

  router.get('/dog/:id', (req, res) => {
    if(req.params.id) {
      dogCtrl.fetchOneDog(req.params.id)
      .populate('toys')
      .then(dog => res.json(dog))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.get('/dog', (req, res) => {
    dogCtrl.fetchAllDogs()
    .then(dogs => res.json(dogs))
    .catch(err => res.status(400).send(err.message));
  });
  router.post('/dog', (req, res) => {
    dogCtrl.createDog(req.body)
    .then(dog => res.json(dog))
    .catch(err => res.status(err.status).send(err.message));
  });
  router.put('/dog/:id', (req, res) => {
    if(req.params.id) {
      dogCtrl.updateDog(req.params.id, req.body)
      .then(newDog => res.json(newDog))
      .catch(err => res.status(404).send(err.message));
    }
  });
  router.delete('/dog/:id', (req, res) => {
    if(req.params.id) {
      dogCtrl.deleteDog(req.params.id)
      .then(deletedDog => res.json(deletedDog))
      .catch(err => res.status(404).send(err.message));
    }
  });
  return router;
};
