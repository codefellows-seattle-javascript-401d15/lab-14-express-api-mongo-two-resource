'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Planet = require('./planet');

const universeSchema = Schema({
  name: {type: String, require: true},
  planets: [{type: Schema.Types.ObjectId, ref: 'planet'}],
});

const Universe = module.exports = mongoose.model('universe', universeSchema);

Universe.findByIdAndAddPlanet = function(id, planet) {
  return Universe.findById(id)
    .then(universe => {
      planet.universeId = universe._id;
      this.tempUniverse = universe;
      return new Planet(planet).save();
    })
    .then(planet => {
      this.tempUniverse.planets.push(planet._id);
      this.tempPlanet = planet;
      return this.tempUniverse.save();
    })
    .then(() => this.tempPlanet)
    .catch(err => Promise.reject(err));
};
