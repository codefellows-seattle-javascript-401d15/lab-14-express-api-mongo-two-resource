'use strict'

const createError = require('http-errors')
const minionCtrl = require('../controllers/minion-controller.js')


module.exports = function(router){
  router.get('/minion', (req, res) => {
    minionCtrl.fetchMinions()
    .then(minion => {
      console.log(minion)
      res.json(minion)
    })
    .catch(err => res.status(404).send(err.message))
  })

  router.get('/minion/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up the GET, boy.'))
    minionCtrl.fetchMinion(req.params.id)
    .then(minion => {
      console.log(minion)
      res.json(minion)
    })
    .catch(err => res.status(404).send(err.message))
  })


  router.post('/minion', (req, res) => {
    if(!req.body) return res.status(400).send(createError('You done fucked up the POST, boy!!'))
    minionCtrl.createMinion(req.body)
    .then(minion => {
      console.log(minion)
      res.json(minion)
    })
    .catch(err => res.status(400).send(err.message))
  })

  router.put('/minion/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up the PUT, boy!!'))
    if(!req.body.name && !req.body.details) return res.status(400).send(createError('you done fucked up the PUT!!'))
    minionCtrl.updateMinion(req.params.id, req.body)
    .then(minion => {
      console.log(minion)
      res.json(minion)
    })
  })
  router.delete('/minion/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('You done fucked up, boy'))
    minionCtrl.deleteMinion(req.params.id)
    .then(minion => {
      console.log(minion)
      res.json(minion)
    })
  })

  return router
}
