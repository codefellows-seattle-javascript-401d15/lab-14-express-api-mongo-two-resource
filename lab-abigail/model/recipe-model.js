'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Food = require('./food-model');

const recipeSchema = Schema({
  name: {type: String, required: true},
  time: {type: Number, required: true},
  food: [{type: Schema.Types.ObjectId, ref: 'food'}],
});

const Recipe = module.exports = mongoose.model('recipe', recipeSchema);

Recipe.findByIdAndAddNote = function(id, food) {
  return Recipe.findById(id)
  .then(recipe => {
    console.log(recipe);
    food.recipeId = recipe._id;

    this.tempRecipe = recipe;
    return new Food(food).save();
  })
  .then(food => {
    this.tempRecipe.foods.push(food._id);
    this.tempFood = food;
    return this.tempRecipe.save();
  })
  .then(() => this.tempRecipe)
  .catch(err => Promise.reject(err));
};
