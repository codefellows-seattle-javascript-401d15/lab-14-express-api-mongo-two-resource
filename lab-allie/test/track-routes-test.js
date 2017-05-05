'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('Track route tests', function() {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  
  describe.only('POST method', function() {
    let albumArray = [];
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'Cold Spring Harbor', 'year': '1971'})
      .end((err, res) => {
        let mockAlbum = res.body;
        albumArray.push(mockAlbum);
        console.log('album array', albumArray);
        console.log('mock album', mockAlbum);
        done();
      });
    });
    
    
    describe('create an item', function() {  
      it('should create an artist', done => {
        chai.request(server)
        .post(`/album/${albumArray[0]}/track`)
        .send({'trackName': 'Why Judy Why'})
        .end((err, res) => {
          if (err) console.error('oh no!', err);
          expect(res.body.trackName).to.equal('Why Judy Why');
          done();
        });
      });
      
      it('should create a title', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.title).to.equal('An Innocent Man');
          done();
        });
      });
      
      it('should create the year', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.year).to.equal('1983');
          done();
        });
      });
      
      it('should respond with 200 on a correct request', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
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
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
    });
  });
  
  
  
  after(done => {
    app.close();
    done();
  });
});