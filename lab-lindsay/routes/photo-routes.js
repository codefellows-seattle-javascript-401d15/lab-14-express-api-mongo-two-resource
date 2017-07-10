'use strict';

const photoCtrl = require('../controller/photo-controller.js');

module.exports = function(router) {
  router.post('/gallery/:galleryId/photo', (req, res) => {
    return photoCtrl.createTrack(req.params.galleryId, req.body, res);
  });

  router.get('/gallery/:galleryId/photo/:id', (req, res) => {
    return photoCtrl.fetchTrack(req.params.galleryId, req.params.photoId, res);
  });

  router.put('/photo/:photoId', (req, res) => {
    return photoCtrl.updateTrack(req.params.photoId, req, res);
  });

  router.delete('/photo/:photoId', (req, res) => {
    return photoCtrl.removeTrack(req.params.photoId, req, res);
  });

  return router;
};
