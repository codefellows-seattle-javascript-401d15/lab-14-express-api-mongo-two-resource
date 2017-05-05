'use strict';

const debug = require('debug')('http:server');
const createError = require('http-errors');
const songCtrl = require('../controller/song-controller');

module.exports = function(router) {

  router.post('/api/song', (req, res) => {
    debug('routes.post(song)');
    // console.log(req.body, 'req.body');
    songCtrl.createSong(req.body)
    .then(song => {
      console.log('post song', song);
      res.json(song);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/song/', (req, res) => {
    debug('routes.get()');
    songCtrl.fetchAllSongs()
    .then(song => {
      console.log(song);
      res.json(song);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.get('/api/song/:id', (req, res) => {
    debug('routes.getById()');

    if (!req.params.id) return res.status(400).send(createError(400, 'bad request'));

    songCtrl.fetchSong(req.params.id)
    .then(song => {
      console.log(song);
      res.json(song);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/song', (req, res) => {
    debug('routes.put()');

    if (!req.query.id) return res.status(400).send(createError(400, 'bad request'));
    if (!req.body.name && !req.body.type) return res.status(400).send(createError(400, 'must change or add a property'));
    songCtrl.updateSong(req.query.id, req.body)
    .then(song => {
      console.log(song);
      res.json(song);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/song', (req, res) => {
    debug('routes.delete()');
    console.log(req.body);
    if (!req.query.id) return res.status(400).send(createError(400, 'bad request'));

    songCtrl.deleteSong(req.query.id)
    .then(() => {
      debug('deleteSong()');
      res.json(`Deleted song: ${req.query.id}`);
      console.log(`Deleted song: ${req.query.id}`);
      res.status(204);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/song/del-all', (req, res) => {
    debug('routes.deleteAllSongs()');

    songCtrl.deleteAll()
    .then(() => {
      debug('deleteAll()');

      console.log('all records deleted');
      res.json('all records deleted');
      res.status(204);
    });
  });
};
