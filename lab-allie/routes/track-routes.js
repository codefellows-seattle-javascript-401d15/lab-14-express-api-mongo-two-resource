'use strict';

// const Track = require('../model/track.js');
const trackCtrl = require('../controller/track-controller.js');

// const Album = require('../model/album.js');
const albumCtrl = require('../controller/album-controller.js');

module.exports = function(router) {
  router.post('/album/:albumId/track', (req, res) => {
    return trackCtrl.createTrack(req.params.albumId, req.body, res);
  });
  
  router.get('/album/:albumId/track/:id', (req, res) => {
    return trackCtrl.fetchTrack(req.params.albumId, req.params.trackId, res);

    // albumCtrl.fetchAlbum(req.params.albumId, res)
    // .then(trackCtrl.fetchTrack(req.params.trackId, res));
  });
  
  router.get('/album/:albumId/track', (req, res) => {
    albumCtrl.fetchAlbum(req.params.albumId, res)
    .then(trackCtrl.fetchAllTracks(res));
  });
  
  router.put('/album/:albumId/track/:trackId', (req, res) => {
    albumCtrl.fetchAlbum(req.params.albumId, res)
    .then(trackCtrl.updateTrack(req, res, req.params.trackId));
  });
  
  router.delete('/album/:albumId/track/:id', (req, res) => {
    albumCtrl.fetchAlbum(req.params.albumId, res)
    .then(trackCtrl.removeTrack(req, res, req.params.id));
  });
  
  return router;
};