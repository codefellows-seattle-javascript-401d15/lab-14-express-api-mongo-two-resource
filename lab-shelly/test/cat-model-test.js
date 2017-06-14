'use strict';

const Cat = require('../model/cat');
const expect = require('chai').expect;
//
describe('CAT MODULE', () => {
  describe('When creating a new cat object', () => {
    this.newCat = new Cat({'name': 'Milo', 'mood': 'sleepy'});
    it('should have a name', done => {
      expect(this.newCat.name).to.equal('Milo');
      done();
    });
    it('should have a mood', done => {
      expect(this.newCat.mood).to.equal('sleepy');
      done();
    });
    it('should have a shelterId', done => {
      expect(this.newCat).to.have.property('shelterId');
      done();
    });
  });
});
