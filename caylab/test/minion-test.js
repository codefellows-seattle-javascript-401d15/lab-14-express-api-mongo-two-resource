'use strict'

const server = require('../server')
const chai = require('chai')
const http = require('chai-http')
const expect = require('chai').expect

chai.use(http)

describe('Minion Routes Module', function(){
  let app
  let testMinion = {
    'name': 'Plague Belcher',
    'ability': 'Whenever another zombie dies, each opponent loses 1 life.',
  }
  let testMinionId
  let testSummonerId
  describe('CRUDDY operations', () => {
    before(done => {
      app = server.listen(8080)
      done()
    })
    before(done => {
      chai.request(server)
      .get('/api/summoner')
      .end((err, res) => {
        testSummonerId = res.body[0]._id
        done()
      })
    })
    after(done => {
      app.close()
      done()
    })

    describe('POST operations', () => {
      it('should make a new minion return a 200', done => {
        chai.request(server)
        .post(`/api/minion/${testSummonerId}`)
        .send(testMinion)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
      it('should fail and return a 400', done => {
        chai.request(server)
        .post(`/api/minion/${testSummonerId}`)
        .send('BLARG')
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done()
        })
      })
    })

    describe('GET requests', () => {
      it('should get all minions and return a 200', done => {
        chai.request(server)
        .get('/api/minion')
        .end((err, res) => {
          testMinionId = res.body[0]._id
          expect(res.status).to.equal(200)
          done()
        })
      })
      it('should return a 404, because its a bad endpoint', done => {
        chai.request(server)
        .get('/api/summunur')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          done()
        })
      })
      it('should get a single minion, and return a 200', done => {
        chai.request(server)
        .get(`/api/minion/${testMinionId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
      it('should return a res.body with an ID that === the testMinionId', done => {
        chai.request(server)
        .get(`/api/minion/${testMinionId}`)
        .end((err, res) => {
          expect(res.body._id).to.equal(testMinionId)
          done()
        })
      })
    })
    describe('PUT requests', () => {
      let putMinion = {
        'name': 'Wayward Servant',
        'ability': 'Whenever another zombie enters the battlefield, each opponent loses 1 life, and you gain 1 life.',
      }
      it('should return a res of 200', done => {
        chai.request(server)
        .put(`/api/minion/${testMinionId}`)
        .send(putMinion)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
      it('should match the name and ability of the minion', done => {
        chai.request(server)
        .get(`/api/minion/${testMinionId}`)
        .end((err, res) => {
          expect(res.body._id).to.equal(testMinionId)
          expect(res.body.name).to.equal(putMinion.name)
          expect(res.body.ability).to.equal(putMinion.ability)
          done()
        })
      })
    })

    describe('Deleting a minion', () => {
      it('should throw an error 404', done => {
        chai.request(server)
        .delete('/api/minion/')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          done()
        })
      })
      it('should delete a minion and return a 200', done => {
        chai.request(server)
        .delete(`/api/minion/${testMinionId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
    })

  })
})
