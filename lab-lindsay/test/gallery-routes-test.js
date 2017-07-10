'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('Gallery route tests', function() {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });

  describe('POST method', function() {
    describe('create an item', function() {
      it('should create a title', done => {
        chai.request(server)
        .post('/api/gallery')
        .send({'title': 'sunset pic', 'year': '2017'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.title).to.equal('sunset pic');
          done();
        });
      });

      it('should create the year', done => {
        chai.request(server)
        .post('/api/gallery')
        .send({'title': 'sunset pic', 'year': '2017'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.year).to.equal('2017');
          done();
        });
      });

      it('should respond with 200 on a correct request', done => {
        chai.request(server)
        .post('/api/gallery')
        .send({'title': 'sunset pic', 'year': '2017'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should respond with 404 if not found', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should be an object', done => {
        chai.request(server)
        .post('/api/gallery')
        .send({'title': 'sunset pic', 'year': '2017'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    let testGet = [];
    before(done => {
      chai.request(server)
      .post('/api/gallery')
      .send({'title': 'sunset pic', 'year': '2017'})
      .end((err, res) => {
        let test = res.body;
        console.log('typeof', typeof test._id);
        testGet.push(test);
        done();
      });
    });

    describe('A request should return an item', function() {
      it('should return a status of 200 on proper request', done => {
        chai.request(server)
        .get(`/api/gallery/${testGet[0]._id}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should be an object', done => {
        chai.request(server)
        .post('/api/gallery')
        .send({'title': 'sunset pic', 'year': '2017'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
    });

    it('should return an error on a bad request', done => {
      chai.request(server)
      .get('/api/gallery/hahahaha')
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return an error if not found', done => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/gallery')
      .query({id: testGet.id})
      .end(() => {
        done();
      });
    });
  });

  describe('PUT method', function(){
    let testPut = [];
    before(done => {
      chai.request(server)
      .post('/api/gallery')
      .send({'title': 'sunset pic', 'year': '2017'})
      .end((err, res) => {
        let test = res.body;
        testPut.push(test);
        done();
      });
    });

    describe('the entry should update', function() {
      it('should change the title', done => {
        chai.request(server)
        .put(`/api/gallery/${testPut[0]._id}`)
        .send({'title': 'another one', 'year': '2045'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.title).to.equal('another one');
          done();
        });
      });
      it('should change the year', done => {
        chai.request(server)
        .put(`/api/gallery/${testPut[0]._id}`)
        .send({'title': 'another one', 'year': '2045'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.year).to.equal('2045');
          done();
        });
      });

      it('should be an object', done => {
        chai.request(server)
        .post('/api/gallery')
        .send({'title': 'another one', 'year': '2045'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
      it('should return an error on a bad request', done => {
        chai.request(server)
        .get('/api/gallery/hahahaha')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });

      it('should return an error if not found', done => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    after(done => {
      testPut.forEach(test => {
        fs.unlinkProm(`${__dirname}/../data/gallery/${test._id}.json`);
        done();
      });
    });
  });

  describe('DELETE method', function() {
    let testDelete;
    before(done => {
      chai.request(server)
      .post('/api/gallery')
      .send({'title': 'another one', 'year': '2045'})
      .end((err, res) => {
        if (err) console.error(err);
        testDelete = res.body._id;
      });
      done();
    });

    describe('it should delete the item', function() {
      it('should successfully remove the name when provided an id', done => {
        chai.request(server)
        .del(`/api/gallery/${testDelete}`)
        .end((err) => {
          if (err) console.error(err);
          expect(testDelete.artist).to.be.empty;
          done();
        });
      });

      it('should return a status of 404 after deleting the item', done => {
        chai.request(server)
        .del(`/api/gallery?id=${testDelete.id}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return an error on a bad request', done => {
        chai.request(server)
        .get('/api/hahaha')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    after(done => {
      chai.request(server)
      .delete('api/gallery')
      .query({id: testDelete.id})
      .end(() => {
        done();
      });
    });
  });

  describe('undefined endpoint', function() {
    it('should respond with 404 if not found', done => {
      chai.request(server)
      .post('/whaaaat')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  after(done => {
    app.close();
    done();
  });
});
