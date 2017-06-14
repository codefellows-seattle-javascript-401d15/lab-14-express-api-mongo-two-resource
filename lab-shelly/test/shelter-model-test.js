'use strict';

const Shelter = require('../model/shelter');
const expect = require('chai').expect;

describe('SHELTER MODULE', () => {
  describe('When creating a new shelter object', () => {
    this.newShelter = new Shelter({name: 'Ballard Animal Clinic', neighborhood: 'Ballard'});
    it('should have a name', done => {
      expect(this.newShelter.name).to.equal('Ballard Animal Clinic');
      done();
    });
    it('should have a neighborhood', done => {
      expect(this.newShelter.neighborhood).to.equal('Ballard');
      done();
    });
    it('should have a cat property', done => {
      expect(this.newShelter).to.have.property('cats');
      done();
    });
  });
});
