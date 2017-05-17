'use strict';

const Aff = require('../model/affiliation');
const expect = require('chai').expect;

describe('Affiliation module', function() {
  describe('when creating a new Aff object', function() {
    let newAff = new Aff({name:'HomeWorld', leader:'Yellow Diamond'});
    it('should be named HomeWorld', done => {
      expect(newAff.name).to.equal('HomeWorld');
      done();
    });
    it('should be rlead by Yellow Diamond', done => {
      expect(newAff.leader).to.equal('Yellow Diamond');
      done();
    });
    it('should have a unique ID provided by mongo', done => {
      let pattern = /[0-9a-f]{24}/;
      expect(newAff.id).to.match(pattern);
      done();
    });
  });
});
