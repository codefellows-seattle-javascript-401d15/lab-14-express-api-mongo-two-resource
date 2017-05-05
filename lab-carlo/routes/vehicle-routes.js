'use strict';
const vehicleCtrl = require('../controller/vehicle-controller');

module.exports = function(router) {

  router.get('/vehicles/:id', (req,res) => {
    vehicleCtrl.fetchVehicle(req.params.id, res);
  });

  router.get('/vehicles', (req, res) => {
    vehicleCtrl.fetchAllVehicles(res);
  });

  router.post('/vehicles', (req, res) =>  {
    vehicleCtrl.createVehicle(req, res, req.body);
  });

  router.delete('vehicles/:id', (req,res) => {
    vehicleCtrl.deleteVehicle(req, res, req.params.id);
  });

  router.put('vehicles/:id', (req, res) => {
    if(req.params.id) {
      vehicleCtrl.putVehicle(req, res, req.params.id);
    }
  });

  return router;

};
