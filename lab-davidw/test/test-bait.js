'use strict';

const Bait = require('../models/bait');
const expect = require('chai').expect;

describe('fishingBait module', function() {
  let newBait = new Bait({name: 'momba', type: 'rattler', targets: 'trout'});
  describe('when adding a new fishing bait', function() {
    it('should have a string for the name, "momba"', done => {
      expect(newBait).to.have.property('name')
      .that.is.a('string')
      .that.equals('momba');
      done();
    });
    it('should have string for the type, "rattler"', done => {
      expect(newBait).to.have.property('type')
      .that.equals('rattler');
      done();
    });
    it('should have a string for targets, "trout"', done => {
      expect(newBait).to.have.property('targets')
      .that.is.a('string')
      .that.equals('trout');
      done();
    });
    it('should have a string for water, "fresh"', done => {
      expect(newBait).to.have.property('water')
      .that.is.a('string')
      .that.equals('fresh');
      done();
    });
    it('should have an id of a unique guid value', done => {
      expect(newBait.id).to.match(/[0-9a-f]{24}/);
      done();
    });
  });
});
