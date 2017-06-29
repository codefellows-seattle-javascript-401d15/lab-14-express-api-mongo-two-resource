'use strict'

const createError = require('http-errors')
const minionCtrl = require('../controllers/minion-controller.js')
const Minion = require('../models/minion.js')
const Summoner = require('../models/summoner.js')


module.exports = function(router){
  router.get('/minion', (req, res) => {
    minionCtrl.fetchMinions()
    .then(minion => {
      res.json(minion)
    })
    .catch(err => res.status(404).send(err.message))
  })
  router.get('/minion/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('Incorrectly formatted the GET.'))
    minionCtrl.fetchMinion(req.params.id)
    .then(minion => {
      res.json(minion)
    })
  })
  //===========================================
  router.post('/minion/:summonerId', (req, res) => {
    if(!req.body) return res.status(400).send(createError('Incorrectly formatted the POST!!'))
    Summoner.findByIdAndAddMinion(req.params.summonerId, req.body)
    .then(minion => {
      res.json(minion)
    })
    .catch(err => res.status(400).send(err.message))
  })
  //===========================================
  router.put('/minion/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('Incorrectly formatted the PUT!!'))
    if(!req.body.name && !req.body.details) return res.status(400).send(createError('Incorrectly formatted the PUT!!'))
    minionCtrl.updateMinion(req.params.id, req.body)
    .then(minion => {
      res.json(minion)
    })
  })
  //===========================================
  router.delete('/minion/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('Incorrectly formatted'))
    minionCtrl.deleteMinion(req.params.id)
    .then(minion => {
      res.json(minion)
    })
  })

  return router
}
