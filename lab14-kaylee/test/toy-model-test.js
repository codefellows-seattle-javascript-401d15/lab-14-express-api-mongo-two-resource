'use strict';

const Toy = require('../models/toy');
const expect = require('chai').expect;

describe('toy module', () => {

  describe('when creating a new Toy object', () => {
    let newToy = new Toy({type: 'ball', color: 'yellow'});
    it('should have a type of "ball"', done => {
      expect(newToy.type).to.equal('ball');
      done();
    });
    it('should have a color of "yellow"', done => {
      expect(newToy.color).to.equal('yellow');
      done();
    });
    it('should have a dogId property', done => {
      expect(newToy).to.have.property('dogId');
      done();
    });
  });
});
