'use strict';

const vehicles = require('../model/vehicles');

module.exports = function(router){
  router.post('/vehicles', (req, res)=>{
    new vehicles(req.body).save()
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/vehicles/:id',(req, res)=>{
    vehicles.findById(req.params.id)
    .populate('cars')
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(404).send(err.message));
  });

  router.get('/vehicles', (req, res) =>{

  });

  router.put('/vehicles/:id', (req, res)=>{

  });

  router.delete('/vehicles/:id', (req, res)=>{

  });

  return router;
};
