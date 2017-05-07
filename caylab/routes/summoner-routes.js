'use strict';

const createError = require('http-errors');
const summonerCtrl = require('../controllers/summoner-controller.js');

module.exports = function(router){
  
  router.get('/summoner/:id', (req, res) => {//get one
    if(!req.params.id) return res.status(400).send(createError('You too stupid to find a summoner, boy?'));
    summonerCtrl.fetchSummoner(req.params.id);
  });


  router.get('/summoner', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You forgot '));
    summonerCtrl.fetchSummoners();
  });

  //===========================================
  router.post('/summoner', (req, res) => {
    summonerCtrl.createSummoner(req.body)
    .then(summoner => res.json(summoner))
    .catch(err => res.status(400).send(err.message));
  });

  //===========================================
  router.put('/summoner/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up the PUT, boy!'));
    if(!req.body.name && !req.body.ability) return res.status(400).send(createError('You fucked up the put details'));

    summonerCtrl.updateSummoner(req.params.id, req.body)
    .then(summoner => {
      console.log(summoner);
      res.json(summoner);
    });
  });

  //===========================================
  router.delete('/summoner/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up the delete'));

    summonerCtrl.deleteSummoner(req.params.id)
    .then(summoner => {
      console.log(summoner);
      res.json(summoner);
    });
  });

  return router;
};
