'use strict';

const Gem = require('../model/gem');
const expect = require('chai').expect;

describe('Gem module', function() {
  describe('when creating a new Gem object', function() {
    let newGem = new Gem({name:'Pearl', color:'Rainbow', weapon: 'spear', isFusion: false});
    it('should have a name of Pearl', done => {
      expect(newGem.name).to.equal('Pearl');
      done();
    });
    it('should be rainbow colored', done => {
      expect(newGem.color).to.equal('Rainbow');
      done();
    });
    it('should have a spear as a weapon', done => {
      expect(newGem.weapon).to.equal('spear');
      done();
    });
    it('should not be a fusion', done => {
      expect(newGem.isFusion).to.equal(false);
      done();
    });
    it('should have a unique ID provided by mongo', done => {
      let pattern = /[0-9a-f]{24}/;
      expect(newGem.id).to.match(pattern);
      done();
    });
  });
});
