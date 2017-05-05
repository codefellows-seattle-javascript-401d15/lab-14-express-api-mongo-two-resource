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
  });
  
  router.put('/track/:trackId', (req, res) => {
    return trackCtrl.updateTrack(req.params.trackId, req, res);
  });
  
  router.delete('/track/:trackId', (req, res) => {
    return trackCtrl.removeTrack(req.params.trackId, req, res);
  });
  
  return router;
};