'use strict';

const carCtrl = require('../controller/car-controller');

module.exports = function(router) {

  router.get('/vehicles/:id/cars/:id', (req,res) => {
    carCtrl.fetchCar(req.params.id, res);
  });

  router.get('/vehicles/:id/cars', (req, res) => {
    carCtrl.fetchAllCars(res);
  });

  router.post('/vehicles/cars', (req, res) =>  {
    carCtrl.createCar(req, res, req.body);
  });

  router.delete('/vehicles/:id/cars/:id', (req,res) => {
    carCtrl.deleteCar(req, res, req.params.id);
  });

  router.put('/cars/:id', (req, res) => {
    if(req.params.id) {
      carCtrl.putCar(req, res, req.params.id);
    }
  });

  return router;
};
