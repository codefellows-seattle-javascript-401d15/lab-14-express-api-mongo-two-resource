'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

let app;

describe('HTTP Server module', function(){
  before(function(done){
    app = server.listen(8000);
    done();
  });

  describe('ensure that api returns a status code of 404 for routes that have not been registered', function() {
    it('should respond with a 404 on an invalid route', function(done) {
      chai.request(server)
      .get('/api/drinks')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('POST method', function() {

    let recipeTest;
    before(done => {
      chai.request(server)
      .post('/api/recipe')
      .send({'recipeName': 'tacos', 'time': 1.5})
      .end((err, res) => {
        if(err) console.error(err);
        recipeTest = res.body;
        done();
      });
    });

    describe('Verify item created', function() {
      it('should create a food', done => {
        chai.request(server)
        .post(`/api/recipe/${recipeTest._id}/food`)
        .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.body.name).to.equal('onions');
          done();
        });
      });

      it('should create food and verify type', done => {
        chai.request(server)
        .post(`/api/recipe/${recipeTest._id}/food`)
        .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.cost).to.equal(4);
          done();
        });
      });

      it('should create food and verify cost', done => {
        chai.request(server)
        .post(`/api/recipe/${recipeTest._id}/food`)
        .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.type).to.equal('yellow');
          done();
        });
      });

      it('should be an object', done => {
        chai.request(server)
        .post(`/api/recipe/${recipeTest._id}/food`)
        .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
    });

    describe('Verify route status and errors', function () {
      it('should respond with 404 if route is not found', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should respond with 200 on proper request', done => {
        chai.request(server)
        .post(`/api/recipe/${recipeTest._id}/food`)
        .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/recipe/${recipeTest._id}`)
      .end(() => {
        done();
      });
    });
  });

  describe('GET method', function() {
    let recipeTest;
    before(done => {
      chai.request(server)
      .post('/api/recipe')
      .send({'recipeName': 'tacos', 'time': 1.5})
      .end((err, res) => {
        if(err) console.error(err);
        recipeTest = res.body;
        done();
      });
    });

    let foodTest = [];
    before(done => {
      chai.request(server)
      .post('/api/food/')
      .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
      .end((err, res) => {
        let food = res.body;
        foodTest.push(food);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/recipe/${recipeTest._id}/food/${foodTest[0]._id}`)
      .end(() => {
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/recipe/${recipeTest._id}`)
      .end(() => {
        done();
      });
    });

    describe('Verify route status and errors', function () {
      it('should return 200 status on proper request', done => {
        chai.request(server)
        .get(`/api/recipe/${recipeTest._id}/food/${foodTest[0]._id}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should respond with 404 status if route is not found', done => {
        chai.request(server)
        .get('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return an object', done => {
        chai.request(server)
        .get('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.an('object');
          done();
        });
      });
    });
  });

  describe('PUT method', function() {
    let recipeTest;
    before(done => {
      chai.request(server)
      .post('/api/recipe')
      .send({'recipeName': 'tacos', 'time': 1.5})
      .end((err, res) => {
        if(err) console.error(err);
        recipeTest = res.body;
        done();
      });
    });

    let foodTest = [];
    before(done => {
      chai.request(server)
      .post('/api/food/')
      .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
      .end((err, res) => {
        let food = res.body;
        foodTest.push(food);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/recipe/${recipeTest._id}/food/${foodTest[0]._id}`)
      .end(() => {
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/recipe/${recipeTest._id}`)
      .end(() => {
        done();
      });
    });

    describe('Verify route status and errors', function () {

      it('should change the food name and type', done => {
        chai.request(server)
        .put(`/api/food/${foodTest[0]._id}`)
        .send({'name': 'banana', 'type': 'yellow'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.name).to.equal('banana');
          done();
        });
      });

      it('should respond with 200 on proper request', done => {
        chai.request(server)
        .put(`/api/recipe/${recipeTest._id}/food/${foodTest[0]._id}`)
        .send({'name': 'banana', 'type': 'yellow'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should respond with 404 if route is not found', done => {
        chai.request(server)
        .put('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('DELETE method', function() {
    let recipeTest;
    before(done => {
      chai.request(server)
      .post('/api/recipe')
      .send({'recipeName': 'tacos', 'time': 1.5})
      .end((err, res) => {
        if(err) console.error(err);
        recipeTest = res.body;
        done();
      });
    });

    let foodTest = [];
    before(done => {
      chai.request(server)
      .post('/api/food/')
      .send({'name': 'onions', 'type': 'yellow', 'cost': 4})
      .end((err, res) => {
        let food = res.body;
        foodTest.push(food);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/recipe/${recipeTest._id}/food/${foodTest[0]._id}`)
      .end(() => {
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete(`/api/recipe/${recipeTest._id}`)
      .end(() => {
        done();
      });
    });

    describe('Verify route status and errors', function () {
      it('should respond with 204 if requested file has been deleted', done => {
        chai.request(server)
        .delete(`/api/recipe/${recipeTest._id}/food/${foodTest[0]._id}`)
        .send({})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(204);
          done();
        });
      });

      it('should respond with 404 if route is not found', done => {
        chai.request(server)
        .delete('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});

describe('HTTP Server module', function(){
  after(function(done){
    app.close();
    done();
  });
});
