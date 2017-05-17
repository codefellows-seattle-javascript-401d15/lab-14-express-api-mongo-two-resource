'use strict';
const Gem = require('../model/gem');
const Aff = require('../model/affiliation');

module.exports = function(router) {
  router.get('/gem/:id', (req, res) => {
    Gem.findById(req.params.id)
      .then(gem => {
        if(gem.length === 0) err => res.status(404).send(err.message);
        res.json(gem);
      })
      .catch(err => res.status(404).send(err.message));
  });

  router.get('/gem', (req, res) => {
    return Gem.find()
      .then(gem => res.json(gem))
      .catch(err => res.status(404).send(err.message));
  });

  router.post('/gem', (req, res) => {
    new Gem (req.body).save()
      .then(gem =>{
        res.json(gem);
        Aff.find({name: gem.affiliation}).then(aff => {
          //console.log(aff);
      //    console.log(gem);
          Aff.findAndAddGem(aff, gem);
        });
      })
      .catch(err => res.status(500).send(err.message));
  });

  router.put('/gem/:id', (req, res) => {
    if(req.params.id) {
      Gem.findById(req.params.id, function(err, gem) {
        if(err) res.status(500).send(err.message);
        gem.name = req.body.name ||  gem.name;
        gem.color = req.body.color ||  gem.color;
        gem.weapon = req.body.weapon ||  gem.weapon;
        gem.isFusion = req.body.isFusion || gem.isFusion;
        if(req.body.affiliation) {
          gem.affiliation = req.body.affiliation;
          Aff.find({name: gem.affiliation})
          .then(aff => {
            //console.log(aff);
            Aff.findByIdAndAddGem(aff._id, gem);
          });
        }
        gem.save()
          .then(gem => res.json(gem))
          .catch(err => res.status(500).send(err.message));
      });
    }
  });

  router.delete('/gem/:id', (req, res) => {
    if(!req.params.id) err => res.status(500).send(err.message);
    return Gem.findByIdAndRemove(req.params.id)
      .then(res.sendStatus(200))
      .catch(err => res.status(500).send(err.message));
  });
  return router;
};
