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

  describe('CAT MODEL Routes', () => {

    describe('POST Method', () => {
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
      describe('request to /shelter/:shelterId/cat endpoint', () => {

        describe('a properly formatted request', () => {
          it('should return a 200 response if given valid id', done => {
            chai.request(server)
            .post(`/api/shelter/${shelter._id}/cat`)
            .send({name: 'Milo', mood: 'happy'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
          });
          it('should return a response object', done => {
            chai.request(server)
            .post(`/api/shelter/${shelter._id}/cat`)
            .send({name: 'Milo', mood: 'happy'})
            .end((err, res) => {
              expect(res).to.be.a('object');
              done();
            });
          });
          it('should return a name: "Milo"', done => {
            chai.request(server)
            .post(`/api/shelter/${shelter._id}/cat`)
            .send({name: 'Milo', mood: 'happy'})
            .end((err, res) => {
              expect(res.body.name).to.equal('Milo');
              done();
            });
          });
          it('should return mood: "happy"', done => {
            chai.request(server)
            .post(`/api/shelter/${shelter._id}/cat`)
            .send({name: 'Milo', mood: 'happy'})
            .end((err, res) => {
              expect(res.body.mood).to.equal('happy');
              done();
            });
          });
        });
        describe('an improperly formatted request', () => {
          it('should return 404 error', done => {
            chai.request(server)
            .post(`/api/shelter/cat`)
            .send({name: 'Milo', mood: 'happy'})
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
          });
        });
      });
    });
    describe('PUT Request', () => {
      let shelter;
      let cat;
      before(done => {
        chai.request(server)
        .post('/api/shelter')
        .send({name: 'Cap Hill SPCA', neighborhood: 'Cap Hill'})
        .end((err, res) => {
          shelter = res.body;
          done();
        });
      });
      before(done => {
        chai.request(server)
        .post(`/api/shelter/${shelter._id}/cat`)
        .send({name: 'Milo', mood: 'happy'})
        .end((err, res) => {
          cat = res.body;
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/shelter/${shelter._id}/cat`)
        .end(() => {
          console.error();
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

      describe('request to /api/cat/:id endpoint', () => {
        describe('a properly formatted request', () => {

          it('should return 200 response', done => {
            chai.request(server)
            .put(`/api/cat/${cat._id}`)
            .send({name: 'Eva', mood: 'grumpy'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
          });

          it('should update the cat name to "Eva"', done => {
            chai.request(server)
            .put(`/api/cat/${cat._id}`)
            .send({name: 'Eva', mood: 'grumpy'})
            .end((err, res) => {
              expect(res.body.name).to.equal('Eva');
              done();
            });
          });
          it('should update the cat mood to "grumpy"', done => {
            chai.request(server)
            .put(`/api/cat/${cat._id}`)
            .send({name: 'Eva', mood: 'grumpy'})
            .end((err, res) => {
              expect(res.body.mood).to.equal('grumpy');
              done();
            });
          });
          describe('an improperly formatted request', () => {
            it('should return a 404 response', done => {
              chai.request(server)
              .put('/api/cat/shelter')
              .send({name: 'Eva', mood: 'grumpy'})
              .end((err, res) => {
                expect(res).to.have.status(404);
                done();
              });
            });
          });
        });
      });
    });

    describe('GET Method', () => {
      let shelter;
      let cat;
      before(done => {
        chai.request(server)
        .post('/api/shelter')
        .send({name: 'Cap Hill SPCA', neighborhood: 'Cap Hill'})
        .end((err, res) => {
          shelter = res.body;
          done();
        });
      });
      before(done => {
        chai.request(server)
        .post(`/api/shelter/${shelter._id}/cat`)
        .send({name: 'Milo', mood: 'happy'})
        .end((err, res) => {
          cat = res.body;
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/shelter/${shelter._id}/cat`)
        .end(() => {
          console.error();
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

      describe('request to /api/cat/:id endpoint', () => {
        describe('a properly formatted request', () => {
          it('should return a 200 response if given valid id', done => {
            chai.request(server)
            .get(`/api/cat/${cat._id}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
          });
          it('should return a response object', done => {
            chai.request(server)
            .get(`/api/cat/${cat._id}`)
            .end((err, res) => {
              expect(res).to.be.a('object');
              done();
            });
          });
          it('should return a cat name: "Milo"', done => {
            chai.request(server)
            .get(`/api/cat/${cat._id}`)
            .end((err, res) => {
              expect(res.body.name).to.equal('Milo');
              done();
            });
          });
          it('should return a mood: "happy"', done => {
            chai.request(server)
            .get(`/api/cat/${cat._id}`)
            .end((err, res) => {
              expect(res.body.mood).to.equal('happy');
              done();
            });
          });
          it('should return a shelterId', done => {
            chai.request(server)
            .get(`/api/cat/${cat._id}`)
            .end((err, res) => {
              expect(res.body).to.have.property('shelterId');
              done();
            });
          });
        });
        describe('an improperly formatted request', () => {
          it('should return 404 error for an invalid id', done => {
            chai.request(server)
            .get('/api/cat/name')
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
      let cat;
      before(done => {
        chai.request(server)
        .post('/api/shelter')
        .send({name: 'Cap Hill SPCA', neighborhood: 'Cap Hill'})
        .end((err, res) => {
          shelter = res.body;
          done();
        });
      });
      before(done => {
        chai.request(server)
        .post(`/api/shelter/${shelter._id}/cat`)
        .send({name: 'Milo', mood: 'happy'})
        .end((err, res) => {
          cat = res.body;
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/shelter/${shelter._id}/cat`)
        .end(() => {
          console.error();
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
      describe('/api/cat/:id endpoint', () => {
        describe('a properly formmated request', () => {
          it('should return a 204 response', done =>{
            chai.request(server)
            .delete(`/api/cat/${cat._id}`)
            .end((err, res) => {
              expect(res).to.have.status(204);
              done();
            });
          });
          it('should delete the item', done => {
            chai.request(server)
            .delete(`/api/cat/${cat._id}`)
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
          .delete(`/api/delete/cat`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
});
