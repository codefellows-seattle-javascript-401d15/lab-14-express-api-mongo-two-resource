'use strict';

const Album = require('../model/album.js');
const albumCtrl = require('../controller/album-controller.js');

module.exports = function(router) {
  router.post('/album', (req, res) => {
    let album = new Album(req.body);
    albumCtrl.createAlbum(req, res, album);
  });
  
  router.get('/album/:id', (req, res) => {
    albumCtrl.fetchAlbum(req.params.id, res);
  });
  
  router.get('/album', (req, res) => {
    albumCtrl.fetchAllAlbums(res);
  });
  
  router.put('/album/:id', (req, res) => {
    if(req.params.id) {
      albumCtrl.updateAlbum(req, res, req.params.id);
    }
  });
  
  router.delete('/album/:id', (req, res) => {
    albumCtrl.removeAlbum(req, res, req.params.id);
  });
  
  return router;
};