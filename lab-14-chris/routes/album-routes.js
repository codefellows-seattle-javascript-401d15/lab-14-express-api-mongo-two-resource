'use strict';

const debug = require('debug')('http:server');
// const createError = require('http-errors');
const albumCtrl = require('../controller/album-controller');

module.exports = function(router) {

  router.post('/api/album', (req, res) => {
    debug('routes.post(album)');
    albumCtrl.createAlbum(req.body)
    .then(album => {
      console.log('post album', album);
      res.json(album);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.delete('/api/album/del-all', (req, res) => {
    debug('routes.deleteAllSongs()');

    albumCtrl.deleteAll()
    .then(() => {
      debug('deleteAll()');

      console.log('all records deleted');
      res.json('all records deleted');
      res.status(204);
    });
  });
};
