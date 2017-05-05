'use strict';

const Track = require('../model/track.js');
const trackCtrl = require('../controller/track-controller.js');
const albumCtrl = require('../controller/album-controller.js');

module.exports = function(router) {
  router.post('/album/:albumId/track', (req, res) => {
    let track = new Track(req.body);
    
    trackCtrl.createTrack(req, res, track);
  });
  
  router.get('/album/:albumId/track/:id', (req, res) => {
    trackCtrl.fetchTrack(req.params.id, res);
  });
  
  router.get('/album/:albumId/track', (req, res) => {
    trackCtrl.fetchAllTracks(res);
  });
  
  router.put('/album/:albumId/track/:trackId', (req, res) => {
    albumCtrl.fetchAlbum(req.params.albumId, res)
    .then(trackCtrl.updateTrack(req, res, req.params.trackId));
  });
  
  router.delete('/album/:albumId/track/:id', (req, res) => {
    trackCtrl.removeTrack(req, res, req.params.id);
  });
  
  return router;
};