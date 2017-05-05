'use strict';

const recipeController = require('../controller/recipe-control');

module.exports = function(router) {

  router.post('/recipe', (req, res) => {
    recipeController.createItem(req, res, req.body);
  });

  router.get('/recipe/:id', (req, res) => {
    recipeController.fetchItem(req.params.id, res);
  });

  router.delete('/recipe/:id', (req, res) => {
    recipeController.deleteItem(req.params.id, res);
  });

  router.put('/recipe/:id', (req, res) => {
    recipeController.updateItem(req, res, req.params.id, req.body);
  });

  return router;
};
