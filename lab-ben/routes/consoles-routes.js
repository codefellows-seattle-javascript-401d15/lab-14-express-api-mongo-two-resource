'use srtict';

const hardwareCtrl = require('../controller/consoles-controller.js');

module.exports = function(router) {
  router.post('/api/consoles', (req, res) => {
    hardwareCtrl.createItem(req.body)
    .then(hardware => res.json(hardware))
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/consoles', (req, res) => {
    if(!req.params.id) {
      hardwareCtrl.findAll()
      .then(items => res.json(items))
      .catch(err => res.status(400).send(err.message));
    } else {
      hardwareCtrl.findItem(req.params.id)
      .then(hardware => res.json(hardware))
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.put('/api/consoles/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('Id required');
    hardwareCtrl.updateItem(req.params.id, req.body)
    .then(hardware => res.json(hardware))
    .catch(err => res.send(400).send(err.message));
  });

  router.delete('/api/consoles/:id', (req, res) => {
    if(!req.params.id) return res.satus(400).send('Id required');
    hardwareCtrl.removeItem(req.params.id)
    .then(() => res.status(204).send('sucessful delete'))
    .catch(err => res.status(404).send(err.message));
  });
};
