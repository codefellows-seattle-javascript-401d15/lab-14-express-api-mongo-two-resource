'use strict';

const createError = require('http-errors');
const Person = require('../models/person.js');
const personCtrl = require('../controllers/person-controller.js');


module.exports = function(router){
  //all
  router.get('/person', (req, res) => {

    personCtrl.fetchPeople()
    .then(person => {
      console.log(person);
      res.json(person);
    })
    .catch(err => res.status(404).send(err.message));
  });

  //get
  router.get('/person/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up the GET, boy.'));

    personCtrl.fetchPerson(req.params.id)
    .then(person => {
      console.log(person);
      res.json(person);
    })
    .catch(err => res.status(404).send(err.message));
  });


  // post new person
  router.post('/person', (req, res) => {
    if(!req.body) return res.status(400).send(createError('You done fucked up the POST, boy!!'));
    personCtrl.createPerson(req.body)
    .then(person => {
      console.log(person);
      res.json(person);
    })
    .catch(err => res.status(400).send(err.message));
  });


  //update person
  router.put('/person/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up the PUT, boy!!'));
    if(!req.body.name && !req.body.details) return res.status(400).send(createError('you done fucked up the PUT!!'));

    personCtrl.updatePerson(req.params.id, req.body)
    .then(person => {
      console.log(person);
      res.json(person);
    });
  });

  //delete a person
  router.delete('/person/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up, boy'));

    personCtrl.deletePerson(req.params.id)
    .then(person => {
      console.log(person);
      res.json(person);
    });
  });

  return router;
};
