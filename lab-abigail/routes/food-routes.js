'use strict';

const foodController = require('../controller/food-control');

module.exports = function(router) {

  router.post('/recipe/:recipeId/food', (req, res) => {
    foodController.createItem(req, res, req.params.recipeId, req.body);
  });

  router.get('/food/:id', (req, res) => {
    foodController.fetchItem(req.params.id, res);
  });

  router.delete('/food/:id', (req, res) => {
    foodController.deleteItem(req.params.id, res);
  });

  router.put('/food/:id', (req, res) => {
    foodController.updateItem(req, res, req.params.id, req.body);
  });

  return router;

};
