'use strict';

const foodController = require('../controller/food-control');

module.exports = function(router) {

  router.post('/recipe/:id/food', (req, res) => {
    foodController.createItem(req, res, req.body);
  });

  router.get('/food/:id', (req, res) => {
    foodController.fetchItem(req.params.id, res);
  });

  router.delete('/recipe/:id/food/:id', (req, res) => {
    foodController.deleteItem(req.params.id, res);
  });

  router.put('/food/:id', (req, res) => {
    foodController.updateItem(req, res, req.params.id, req.body);
  });

  return router;

};
