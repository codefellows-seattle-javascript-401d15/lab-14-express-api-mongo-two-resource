'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = require('chai').expect;

chai.use(http);

describe('Server Module', () => {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('SHELTER MODEL Routes', () => {

    describe('GET Method', () => {
      let shelter;
      before(done => {
        chai.request(server)
        .post('/api/shelter')
        .send({name: 'Cap Hill SPCA', neighborhood: 'Cap Hill'})
        .end((err, res) => {
          shelter = res.body;
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/shelter/${shelter._id}`)
        .end(() => {
          console.error();
          done();
        });
      });
      describe('request to /api/shelter/:id endpoint', () => {
        describe('a properly formatted request', () => {
          it('should return a 200 response if given valid id', done => {
            chai.request(server)
            .get(`/api/shelter/${shelter._id}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
          });
          it('should return a response object', done => {
            chai.request(server)
            .get(`/api/shelter/${shelter._id}`)
            .end((err, res) => {
              expect(res).to.be.a('object');
              done();
            });
          });
          it('should return a name: "Cap Hill SPCA"', done => {
            chai.request(server)
            .get(`/api/shelter/${shelter._id}`)
            .end((err, res) => {
              expect(res.body.name).to.equal('Cap Hill SPCA');
              done();
            });
          });
          it('should return neighborhood: "Cap Hill"', done => {
            chai.request(server)
            .get(`/api/shelter/${shelter._id}`)
            .end((err, res) => {
              expect(res.body.neighborhood).to.equal('Cap Hill');
              done();
            });
          });
          it('should include an array of linked cats', done => {
            chai.request(server)
            .get(`/api/shelter/${shelter._id}`)
            .end((err, res) => {
              expect(res.body).to.have.property('cats');
              done();
            });
          });
        });
        describe('an improperly formatted request', () => {
          it('should return 404 error for an invalid id', done => {
            chai.request(server)
            .get('/api/shelter/1234')
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
    describe('PUT Method', () => {
      let shelter;
      before(done => {
        chai.request(server)
        .post('/api/shelter')
        .send({name: 'Cap Hill SPCA', neighborhood: 'Cap Hill'})
        .end((err, res) => {
          shelter = res.body;
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/shelter/${shelter._id}`)
        .end(() => {
          console.error();
          done();
        });
      });
      describe('request to api/shelter/:id endpoint', () => {
        describe('a properly formatted request', () => {
          it('should return a 200 response', done => {
            chai.request(server)
            .put(`/api/shelter/${shelter._id}`)
            .send({name: 'North Cap Hill SPCA', neighorhood: 'North Cap Hill'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
          });
          it('should update the requested shelter', done => {
            chai.request(server)
            .put(`/api/shelter/${shelter._id}`)
            .send({name: 'North Cap Hill SPCA', neighorhood: 'North Cap Hill'})
            .end((err, res) => {
              expect(res.body).to.not.equal(shelter.body);
              done();
            });
          });
          it('should update the name to "North Cap Hill SPCA"', done => {
            chai.request(server)
            .put(`/api/shelter/${shelter._id}`)
            .send({name: 'North Cap Hill SPCA', neighborhood: 'North Cap Hill'})
            .end((err, res) => {
              expect(res.body.name).to.equal('North Cap Hill SPCA');
              done();
            });
          });
          it('should update the neighorhood to "North Cap Hill"', done => {
            chai.request(server)
            .put(`/api/shelter/${shelter._id}`)
            .send({name: 'North Cap Hill SPCA', neighborhood: 'North Cap Hill'})
            .end((err, res) => {
              expect(res.body.neighborhood).to.equal('North Cap Hill');
              done();
            });
          });
        });
        describe('an invalid request', () => {
          it('should return a 404 response for route not found', done => {
            chai.request(server)
            .put(`/api/animal`)
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
    describe('POST Method', () => {
      describe('request to /api/shelter endpoint', () => {
        describe('a properly formatted request', () => {
          it('should return a 200 response', done => {
            chai.request(server)
            .post('/api/shelter')
            .send({name: 'Belltown SPCA', neighborhood: 'Belltown'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
          });
          it('should create a new shelter in Belltown', done => {
            chai.request(server)
            .post('/api/shelter')
            .send({name: 'Belltown SPCA', neighborhood: 'Belltown'})
            .end((err, res) => {
              expect(res.body.neighborhood).to.equal('Belltown');
              done();
            });
            it('should create a new shelter named "Bellowtown SPCA"', done => {
              chai.request(server)
              .post('/api/shelter')
              .send({name: 'Belltown SPCA', neighborhood: 'Belltown'})
              .end((err, res) => {
                expect(res.body.name).to.equal('Belltown SPCA');
                done();
              });
            });
          });
        });
        describe('an improperly formatted request', () => {
          it('should return a 404 response', done => {
            chai.request(server)
            .post('/api/shelters')
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
    describe('DELETE Method', () => {
      let shelter;
      before(done => {
        chai.request(server)
        .post('/api/shelter')
        .send({name: 'Cap Hill SPCA', neighborhood: 'Cap Hill'})
        .end((err, res) => {
          shelter = res.body;
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/shelter/${shelter._id}`)
        .end(() => {
          console.error();
          done();
        });
      });
      describe('/api/shelter:id endpoint', () => {
        describe('a properly formmated request', () => {
          it('should return a 204 response', done =>{
            chai.request(server)
            .delete(`/api/shelter/${shelter._id}`)
            .end((err, res) => {
              expect(res).to.have.status(204);
              done();
            });
          });
          it('should delete the item', done => {
            chai.request(server)
            .delete(`/api/shelter/${shelter._id}`)
            .end((err, res) => {
              expect(res.body).to.be.empty;
              done();
            });
          });
        });
      });
      describe('an improperly formatted request', () => {
        it('should return a 404 response', done => {
          chai.request(server)
          .delete('/api/shelters')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
});
