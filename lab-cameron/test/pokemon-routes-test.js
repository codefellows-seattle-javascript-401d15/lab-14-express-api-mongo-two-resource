'use strict';

const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function() {
  describe('#POST', function() {
    let pokemons = [];
    after(done => {
      pokemons.forEach(ele => {
        chai.request(server)
        .delete(`/api/pokemon/${ele._id}`)
        .end();
      });
      done();
    });
    describe('/api/pokemon', function() {
      it('Should respond with status 200 on a proper request', done => {
        chai.request(server)
        .post('/api/pokemon')
        .send({name: 'mew', type: 'legendary'})
        .end((err, res) => {
          let pokemon = JSON.parse(res.text.toString());
          pokemons.push(pokemon);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        chai.request(server)
        .post('/api/pokemon')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('#GET', function() {
    let pokemons = [];
    before(done => {
      chai.request(server)
      .post('/api/pokemon')
      .send({name: 'mew', type: 'legendary'})
      .end((err, res) => {
        let pokemon = JSON.parse(res.text.toString());
        pokemons.push(pokemon);
        done();
      });
    });
    after(done => {
      pokemons.forEach(ele => {
        chai.request(server)
        .delete(`/api/pokemon/${ele._id}`)
        .send()
        .end();
      });
      done();
    });
    describe('requests made to /api/pokemon/:id', function() {
      it('Should respond with status 200 on a proper request', done => {
        let testmon = pokemons[0];
        chai.request(server)
        .get(`/api/pokemon/${testmon._id}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        chai.request(server)
        .get(`/api/pokemon/1234`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
      describe('requests made to /api/pokemon', function() {
        it('Should respond with status 200 on a proper request and return whole schema', done => {
          chai.request(server)
          .get('/api/pokemon')
          .send()
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('Should respond with status 400 on a bad request', done => {
          chai.request(server)
          .get(`/api/pokemon/1234`)
          .send()
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });
    });
  });

  describe('#PUT', function() {
    let pokemons = [];
    before(done => {
      chai.request(server)
      .post('/api/pokemon')
      .send({name: 'mew', type: 'legendary'})
      .end((err, res) => {
        let pokemon = JSON.parse(res.text.toString());
        pokemons.push(pokemon);
        done();
      });
    });
    after(done => {
      pokemons.forEach(ele => {
        chai.request(server)
        .delete(`/api/pokemon/${ele._id}`)
        .end();
      });
      done();
    });
    describe('requests made to /api/pokemon/:id', function() {
      it('Should respond with status 200', done => {
        let testmon = pokemons[0];
        chai.request(server)
        .put(`/api/pokemon/${testmon._id}`)
        .send({name: 'mewtwo'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 404 given no id', done => {
        chai.request(server)
        .put('/api/pokemon')
        .send({name: 'mewtwo'})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
      it('should modify a specific record given the correct inputs', done => {
        let testmon = pokemons[0];
        chai.request(server)
        .put(`/api/pokemon/${testmon._id}`)
        .send({type: 'psychic'})
        .end((err, res) => {
          let test = JSON.parse(res.text);
          expect(test.type).to.equal('psychic');
          done();
        });
      });
      it('Should respond with status 400 given bad inputs', done => {
        let testmon = pokemons[0];
        chai.request(server)
        .put(`/api/pokemon/${testmon._id}`)
        .send({attack: 40}) // attack isn't a property which exists on the Pokemon model
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
    describe('requests made to /api/pokemon/:pokemonId/move/:id', function() {
      let moves = [];
      before(done => {
        chai.request(server)
        .post('/api/move')
        .send({name: 'hyper beam', attack: 100, power: 5})
        .end((err, res) => {
          let move = JSON.parse(res.text.toString());
          moves.push(move);
          done();
        });
      });
      after(done => {
        moves.forEach(ele => {
          chai.request(server)
          .delete(`/api/move/${ele._id}`)
          .end();
        });
        done();
      });
      it('Should respond with status 200', done => {
        let testmon = pokemons[0];
        let testmove = moves[0];
        chai.request(server)
        .put(`/api/pokemon/${testmon._id}/move/${testmove._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 404 given no id', done => {
        chai.request(server)
        .put('/api/pokemon/:pokemonId/move/:id')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });

  describe('#DELETE', function() {
    let pokemons = [];
    before(done => {
      chai.request(server)
      .post('/api/pokemon')
      .send({name: 'mew', type: 'legendary'})
      .end((err, res) => {
        let pokemon = JSON.parse(res.text.toString());
        pokemons.push(pokemon);
        done();
      });
    });
    describe('requests made to /api/pokemon/:id', function() {
      it('Should respond with status 204 on a proper request', done => {
        let testmon = pokemons[0];
        chai.request(server)
        .delete(`/api/pokemon/${testmon._id}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
      });
      it('Should respond with status 404 for proper request with invalid id', done => {
        chai.request(server)
        .delete('/api/pokemon/1234')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
});
