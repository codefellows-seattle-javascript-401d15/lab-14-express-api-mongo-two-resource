'use strict'

const server = require('../server')
const chai = require('chai')
const http = require('chai-http')
const expect = require('chai').expect

chai.use(http)

describe('Summoner Routes Module', function(){
  let app
  let testSummoner = {
    'name': 'Nicol Bolas',
  }
  let testSummonerId
  describe('CRUDDY operations', () => {
    before(done => {
      app = server.listen(8080)
      done()
    })
    after(done => {
      app.close()
      done()
    })

    describe('POST operations', () => {
      it('should make a new summoner return a 200', done => {
        chai.request(server)
        .post('/api/summoner')
        .send(testSummoner)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
      it('should fail and return a 400', done => {
        chai.request(server)
        .post('/api/summoner')
        .send('BLARG')
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done()
        })
      })
    })

    describe('GET requests', () => {
      it('should get all summoners and return a 200', done => {
        chai.request(server)
        .get('/api/summoner')
        .end((err, res) => {
          testSummonerId = res.body[0]._id
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
      it('should get a single summoner, and return a 200', done => {
        chai.request(server)
        .get(`/api/summoner/${testSummonerId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
      it('should return a res.body with an ID that === the testSummonerId', done => {
        chai.request(server)
        .get(`/api/summoner/${testSummonerId}`)
        .end((err, res) => {
          expect(res.body._id).to.equal(testSummonerId)
          done()
        })
      })
    })
    describe('PUT requests', () => {
      let putSummoner = {
        'name': 'Nicol Bolas',
        'ability': 'God Pharoahs Presence: When Nicol Bolas enters the field, search your library for up to three legendary gods, and put them onto the battlefield.',
      }
      it('should return a res of 200', done => {
        chai.request(server)
        .put(`/api/summoner/${testSummonerId}`)
        .send(putSummoner)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
      it('should match the name and ability of the summoner', done => {
        chai.request(server)
        .get(`/api/summoner/${testSummonerId}`)
        .end((err, res) => {
          expect(res.body._id).to.equal(testSummonerId)
          expect(res.body.name).to.equal(putSummoner.name)
          expect(res.body.ability).to.equal(putSummoner.ability)
          done()
        })
      })
    })

    describe('Deleting a summoner', () => {
      it('should throw an error 404', done => {
        chai.request(server)
        .delete('/api/summoner/')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          done()
        })
      })
      it('should delete a summoner and return a 200', done => {
        chai.request(server)
        .delete(`/api/summoner/${testSummonerId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
      })
    })

  })
})
