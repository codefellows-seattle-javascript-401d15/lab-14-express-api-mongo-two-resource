'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('Track Route Tests', function() {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });

  describe('Testing POST for a new track', function() {
    let mockAlbum;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        if(err) console.error(err);
        mockAlbum = res.body;
        done();
      });
    });
    
    describe('Add a track to the mock album', function() {
      it('should create a track', done => {
        chai.request(server)
        .post(`/api/album/${mockAlbum._id}/track`)
        .send({'trackName': 'This Night'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.body.trackName).to.equal('This Night');
          done();
        });
      });
      
      it('should have an _id', done => {
        chai.request(server)
        .post(`/api/album/${mockAlbum._id}/track`)
        .send({'trackName': 'This Night'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(mockAlbum).to.have.property('_id');
          done();
        });
      });
      
      it('should respond with 200 on a correct request', done => {
        chai.request(server)
        .post(`/api/album/${mockAlbum._id}/track`)
        .send({'trackName': 'This Night'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should respond with 400 on a bad request', done => {
        chai.request(server)
        .post('/api/album/')
        .send({'trackName': 'This Night'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
      
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .post('/')
        .send({'trackName': 'This Night'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      it('should be an object', done => {
        chai.request(server)
        .post(`/api/album/${mockAlbum._id}/track`)
        .send({'trackName': 'This Night'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(mockAlbum).to.be.a('object');
          done();
        });
      });
    });
    
    after(done => {
      chai.request(server)
      .delete(`/api/album/${mockAlbum._id}`)
      .end(() => {
        done();
      });
    });
  });
  
  describe('Testing GET for an existing track', function() {
    let mockAlbum;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        if(err) console.error(err);
        mockAlbum = res.body;
        done();
      });
    });
    
    let mockTrack;
    before(done => {
      chai.request(server)
      .post(`/api/album/${mockAlbum._id}/track`)
      .send({'trackName': 'This Night'})
      .end((err, res) => {
        if(err) console.error(err);
        mockTrack = res.body;
        done();
      });
    });
    
    describe('Get a track from the mock album', function() {
      it('should return a track', done => {
        chai.request(server)
        .get(`/api/album/${mockAlbum._id}/track/${mockTrack._id}`)
        // .send({'trackName': 'This Night'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(mockTrack.trackName).to.equal('This Night');
          done();
        });
      });
      
      it('should have an albumId', done => {
        chai.request(server)
        .get(`/api/album/${mockAlbum._id}/track/${mockTrack._id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(mockTrack).to.have.property('albumId');
          done();
        });
      });
      
      it('should respond with 200 on a correct request', done => {
        chai.request(server)
        .get(`/api/album/${mockAlbum._id}/track/${mockTrack._id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .get('/api')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      it('should respond with 400 if it is a bad request', done => {
        chai.request(server)
        .get('/api')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    
    after(done => {
      chai.request(server)
      .delete(`/api/album/${mockAlbum._id}/track`)
      .end(() => {
        done();
      });
    });
    
    after(done => {
      chai.request(server)
      .delete(`/api/album/${mockAlbum._id}`)
      .end(() => {
        done();
      });
    });
    
  });

  describe('Testing PUT for an existing track', function() {
    let mockAlbum;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        if(err) console.error(err);
        mockAlbum = res.body;
        done();
      });
    });
    
    let mockTrack;
    before(done => {
      chai.request(server)
      .post(`/api/album/${mockAlbum._id}/track`)
      .send({'trackName': 'This Night'})
      .end((err, res) => {
        if(err) console.error(err);
        mockTrack = res.body;
        console.log('mocktrack', mockTrack);
        done();
      });
    });
    
    describe('the entry should update', function() {
      it('should update the track name', done => {
        chai.request(server)
        .put(`/api/track/${mockTrack._id}`)
        .send({'trackName': 'Uptown Girl'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.trackName).to.equal('Uptown Girl');
          done();
        });
      });
      
      it('should no longer equal the original track name', done => {
        chai.request(server)
        .put(`/api/track/${mockTrack._id}`)
        .send({'trackName': 'Uptown Girl'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.trackName).to.not.equal('This Night');
          done();
        });
      });
      
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .get('/api')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      it('should respond with 400 if it is a bad request', done => {
        chai.request(server)
        .get('/api')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    
    after(done => {
      chai.request(server)
      .delete(`/api/album/${mockAlbum._id}/track`)
      .end(() => {
        done();
      });
    });
    
    after(done => {
      chai.request(server)
      .delete(`/api/album/${mockAlbum._id}`)
      .end(() => {
        done();
      });
    });
  });
  
  describe('Testing DELETE for an existing track', function() {
    let mockAlbum;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        if(err) console.error(err);
        mockAlbum = res.body;
        done();
      });
    });
    
    let mockTrack;
    before(done => {
      chai.request(server)
      .post(`/api/album/${mockAlbum._id}/track`)
      .send({'trackName': 'This Night'})
      .end((err, res) => {
        if(err) console.error(err);
        mockTrack = res.body;
        console.log('mocktrack', mockTrack);
        done();
      });
    });
  });

  describe('Testing an undefined endpoint', function() {});

  after(done => {
    app.close();
    done();
  });
});