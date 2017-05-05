'use strict';

const Car = require('../model/car');
const vehicles = require('../model/vehicles');
const vehiclesCtrl = require('../controller/vehicles-controller')

module.exports = function(router){
  // router.get('/car/:id', (req, res) =>{
  //
  // });
  //
  // router.get('/car', (req, res)=> {
  //
  // });

  router.post('/vehicles/:id/car', (req, res) => {
    vehiclesCtrl.findByIdAndAddNote(req.params.id, req.body)
    .then(car => res.json(car))
    .catch(err => res.status(404).send(err.message));
  });

  // router.put('/note', (req, res) =>{
  //
  // });
  //
  // router.delete('/note/:id', (req, res) => {
  //
  // });

  return router;
};
