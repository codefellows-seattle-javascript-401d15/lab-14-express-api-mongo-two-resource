'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(5000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('GET method', function() {
    let dog;
    let toy;

    before(done => {
      chai.request(server)
      .post('/api/dog')
      .send({name: 'Johnny', breed: 'pitbull'})
      .end((err, res) => {
        dog = res.body;
        done();
      });
    });

    before(done => {
      chai.request(server)
      .post(`/api/dog/${dog._id}/toy`)
      .send({type: 'rope', color: 'blue', dogId: dog._id})
      .end((err, res) => {
        toy = res.body;
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/dog/${dog._id}`)
      .end(() => {
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/toy/${toy._id}`)
      .end(() => {
        done();
      });
    });

    describe('a properly formatted request', function() {
      it('should return a 200 status code', done => {
        chai.request(server)
        .get(`/api/toy/${toy._id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('an improperly formatted request', function() {
      it('should return a 404 status code given an invalid _id property', done => {
        chai.request(server)
        .get('/api/toy/badId')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST method', function() {
    let dog;

    before(done => {
      chai.request(server)
      .post('/api/dog')
      .send({name: 'Johnny', breed: 'pitbull'})
      .end((err, res) => {
        dog = res.body;
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/dog/${dog._id}`)
      .end(() => {
        done();
      });
    });

    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid body', done => {
        chai.request(server)
        .post(`/api/dog/${dog._id}/toy`)
        .send({type: 'bone', color: 'white'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('an improperly formatted request', function() {
      it('should return a 404 status code given an invalid dogId property', done => {
        chai.request(server)
        .post(`/api/dog/badId/toy`)
        .send({type: 'bone', color: 'tan'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT method', function() {
    let dog;
    let toy;

    before(done => {
      chai.request(server)
      .post('/api/dog')
      .send({name: 'Bruno', breed: 'chihuahua'})
      .end((err, res) => {
        dog = res.body;
        done();
      });
    });

    before(done => {
      chai.request(server)
      .post(`/api/dog/${dog._id}/toy`)
      .send({type: 'disk', color: 'red', dogId: dog._id})
      .end((err, res) => {
        toy = res.body;
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/dog/${dog._id}`)
      .end(() => {
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/toy/${toy._id}`)
      .end(() => {
        done();
      });
    });

    describe('a properly formatted request', function() {
      it('should return a 200 status code', done => {
        chai.request(server)
        .put(`/api/toy/${toy._id}`)
        .send({type: 'ball', color: 'yellow'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('a improperly formatted request', function() {
      it('should return a 404 status code given an invalid _id property', done => {
        chai.request(server)
        .put(`/api/toy/badId`)
        .send({type: 'ball', color: 'yellow'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('DELETE method', function() {
    let dog;
    let toy;

    before(done => {
      chai.request(server)
      .post('/api/dog')
      .send({name: 'Doggo', breed: 'greyhound'})
      .end((err, res) => {
        dog = res.body;
        done();
      });
    });

    before(done => {
      chai.request(server)
      .post(`/api/dog/${dog._id}/toy`)
      .send({type: 'stick', color: 'brown', dogId: dog._id})
      .end((err, res) => {
        toy = res.body;
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/dog/${dog._id}`)
      .end(() => {
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/toy/${toy._id}`)
      .end(() => {
        done();
      });
    });

    describe('a properly formatted request', function() {
      it('should return a 200 status code', done => {
        chai.request(server)
        .delete(`/api/toy/${toy._id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('a improperly formatted request', function() {
      it('should return a 404 status code given an invalid _id property', done => {
        chai.request(server)
        .delete(`/api/toy/badId`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
