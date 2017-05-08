'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const gameController = require('../lib/game-controller.js');

module.exports = function(router) {
  router.get('/api/game/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('Id needed.');
    gameController.fetchOneGame(req.params.id)
    .then(game => {
      res.json(game);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/game', (req, res) => {
    gameController.fetchAllGames()
    .then(games => {
      res.json(games);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.post('/api/game', (req, res) => {
    gameController.createGame(req.body)
    .then(game => {
      res.json(game);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/game/:id', (req, res) => {
    gameController.updateGameById(req.body.id, req.body)
    .then(game => {
      res.json(game);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.delete('/api/game/:id', (req, res) => {
    gameController.deleteGameById(req.params.id)
    .then(res.status(204).send('Game deleted.'))
    .catch(err => res.status(400).send(err.message));
  });

  return(router);
};
