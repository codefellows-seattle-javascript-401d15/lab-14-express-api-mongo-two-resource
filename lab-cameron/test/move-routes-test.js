'use strict';

const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function() {
  // let app;
  // before(done => {
  //   app = server.listen(6660);
  //   done();
  // });
  // after(done => {
  //   app.close();
  //   done();
  // });
  describe('#POST', function() {
    let moves = [];
    after(done => {
      moves.forEach(ele => {
        chai.request(server)
        .delete(`/api/move/${ele._id}`)
        .end();
      });
      done();
    });
    describe('/api/move', function() {
      it('Should respond with status 200 on a proper request', done => {
        chai.request(server)
        .post('/api/move')
        .send({name: 'hyper beam', attack: 100, power: 5})
        .end((err, res) => {
          let move = JSON.parse(res.text.toString());
          moves.push(move);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        chai.request(server)
        .post('/api/move')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('#GET', function() {
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
    describe('requests made to /api/move/:id', function() {
      it('Should respond with status 200 on a proper request', done => {
        let testmove = moves[0];
        chai.request(server)
        .get(`/api/move/${testmove._id}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        chai.request(server)
        .get(`/api/move/1234`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
      describe('requests made to /api/moveCtrl', function() {
        it('Should respond with status 200 on a proper request and return whole schema', done => {
          chai.request(server)
          .get('/api/move')
          .send()
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('Should respond with status 400 on a bad request', done => {
          chai.request(server)
          .get(`/api/move/1234`)
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
    describe('requests made to /api/move/:id', function() {
      it('Should respond with status 200', done => {
        let testmove = moves[0];
        chai.request(server)
        .put(`/api/move/${testmove._id}`)
        .send({name: 'psybeam'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 404 given no id', done => {
        chai.request(server)
        .put('/api/move')
        .send({name: 'mewtwo'})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
      it('should modify a specific record given the correct inputs', done => {
        let testmove = moves[0];
        chai.request(server)
        .put(`/api/move/${testmove._id}`)
        .send({power: 10})
        .end((err, res) => {
          let test = JSON.parse(res.text);
          expect(test.power).to.equal(10);
          done();
        });
      });
      it('Should respond with status 400 given bad inputs', done => {
        let testmove = moves[0];
        chai.request(server)
        .put(`/api/move/${testmove._id}`)
        .send({type: 'psychic'}) // type isn't a property which exists on the Move model
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('#DELETE', function() {
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
    describe('requests made to /api/move/:id', function() {
      it('Should respond with status 204 on a proper request', done => {
        let testmove = moves[0];
        chai.request(server)
        .delete(`/api/move/${testmove._id}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
      });
      it('Should respond with status 404 for proper request with invalid id', done => {
        chai.request(server)
        .delete('/api/move/1234')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
});
