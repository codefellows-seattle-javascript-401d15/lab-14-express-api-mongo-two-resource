'use strict';
const app = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
chai.use(http);

describe('server module', function() {
  let resource;
  let id1;
  let affsource;
  let affid;
  describe('POST METHOD', function() {
    it('should post an affiliation', () => {
      chai.request(app)
      .post('/api/aff')
      .send({name: 'Earth', leader: 'Rose Quartz'})
      .end((err, res) => {
        if(err) console.error(err.message);
        affsource = res.body;
        affid = affsource._id;
        expect(res.status).to.equal(200);
      }); //close end
    }); // close it
    it('should post a gem', done => {
      chai.request(app)
      .post('/api/gem/')
      .send({name: 'Garnet', color:'red', weapon: 'fists', isFusion: true, affiliation:'Earth'})
      .end((err, res) => {
        if(err) console.error(err.message);
        resource = res.body;
        id1 = resource._id;
        expect(res.status).to.equal(200);
        done();
      }); //close end
    }); // close it
  }); // close POST method

  describe('GET method', function() {
    describe('/api/gem route', function() {
      describe('a properly formatted request', function() {
        it('should return a resource given proper id', done => {
          chai.request(app)
          .get(`/api/gem/${id1}`)
          .end((err, res) => {
            if(err) console.error(err.message);
            let expected = res.body;
            expect(expected).to.deep.equal(resource);
            done();
          }); // close end
        }); // close it
        it('should return an affiliation when given id', done => {
          chai.request(app)
          .get(`/api/aff/${affid}`)
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          }); // close end
        }); //close it
      }); // close describe proper format req
      describe('an improperly formatted request', function() {
        it('should return 400/bad request', done => {
          chai.request(app)
          .get('/api/gem/bob')
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(404);
            done();
          }); //close end
        }); //close it
      }); //close improp format
      describe('unregistered route', function() {
        it('should write 404 to the response head in router.js', done => {
          chai.request(app)
          .get('/api/not')
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(404);
            done();
          }); //close end
        }); // close it
      }); // close unregistered
    });// close describe api/gem routes
  }); // close describe GET

  describe('PUT method', function() {
    describe('/api/gem route', function() {
      it('should update a resource with a 200 status', done => {
        chai.request(app)
        .put(`/api/gem/${id1}`)
        .send({name: 'Steven', color: 'Pink', weapon: 'sheild', isFusion: false})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        }); // close end
      }); // close it
      it('should update an affiliation', done => {
        chai.request(app)
        .put(`/api/aff/${affid}`)
        .send({name: 'The Crystal Gems', leader: 'Steven'})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        }); //close end
      }); //close it
      it('should retrieve the updated gem', done => {
        chai.request(app)
        .get(`/api/gem/${id1}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          let expected = res.body;
          expect(expected.name).to.equal('Steven');
          done();
        }); //close end
      }); //close it
      it('retrieve update affiliation', done => {
        chai.request(app)
        .get(`/api/aff/${affid}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          let expected = res.body;
          expect(expected.name).to.equal('The Crystal Gems');
          done();
        });
      });
    }); // close describe route

    describe('bad request', function() {
      it('should respond with 400/bad request', done => {
        chai.request(app)
        .put(`/api/gem?id=${resource._id}`)
        .send({owner: 'Misa Misa', shinigami: 'Ryuuk', deathCount: 9001})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(404);
          expect(err.message).to.include('Not Found');
          done();
        }); // close end
      }); // close it
    });// close describe bad route
  }); //close put method

  describe('DELETE method', function() {
    describe('/api/gem route', function() {
      it('should shatter gem with a 200 status', done => {
        chai.request(app)
        .delete(`/api/gem/${id1}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        }); // close end
      }); // close it
      it('should delete the affiliation', done => {
        chai.request(app)
        .delete(`/api/aff/${affid}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should not be able to GET a shattered gem', done => {
        chai.request(app)
        .get(`/api/gem/${id1}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(404);
          done();
        }); // close end
      }); // close it
      it('should not be able to GET a deleted affiliation', done => {
        chai.request(app)
        .get(`/api/aff/${affid}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(404);
          done();
        }); // close end
      }); //close it
    }); // close describe route
  }); //close delete method
}); // close describe SERVER MODULE
