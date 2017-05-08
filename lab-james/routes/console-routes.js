'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const gameConsoleController = require('../lib/console-controller.js');

module.exports = function(router) {
  router.get('/api/gameConsole/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('Id needed.');
    gameConsoleController.fetchOneGameConsole(req.params.id)
    .then(gameConsole => {
      res.json(gameConsole);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/gameConsole', (req, res) => {
    gameConsoleController.fetchAllGameConsoles()
    .then(gameConsoles => {
      res.json(gameConsoles);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.post('/api/gameConsole', (req, res) => {
    gameConsoleController.createGameConsole(req.body)
    .then(gameConsole => {
      res.json(gameConsole);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/gameConsole/:id', (req, res) => {
    gameConsoleController.updateGameConsoleById(req.body.id, req.body)
    .then(gameConsole => {
      res.json(gameConsole);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.delete('/api/gameConsole/:id', (req, res) => {
    gameConsoleController.deleteGameConsoleById(req.params.id)
    .then(res.status(204).send('Game Console deleted.'))
    .catch(err => res.status(400).send(err.message));
  });

  return(router);
};
