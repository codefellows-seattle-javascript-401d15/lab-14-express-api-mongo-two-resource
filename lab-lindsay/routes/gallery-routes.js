'use strict';

const Gallery = require('../model/gallery.js');
const galleryCtrl = require('../controller/gallery-controller.js');

module.exports = function(router) {
  router.post('/gallery', (req, res) => {
    let gallery = new Gallery(req.body);
    galleryCtrl.createGallery(req, res, gallery);
  });

  router.get('/gallery/:id', (req, res) => {
    galleryCtrl.fetchGallery(req.params.id, res);
  });

  router.get('/gallery', (req, res) => {
    galleryCtrl.fetchAllGallerys(res);
  });

  router.put('/gallery/:id', (req, res) => {
    if(req.params.id) {
      galleryCtrl.updateGallery(req, res, req.params.id);
    }
  });

  router.delete('/gallery/:id', (req, res) => {
    galleryCtrl.removeGallery(req, res, req.params.id);
  });

  return router;
};
