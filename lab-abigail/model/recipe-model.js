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

Recipe.findByIdAndAddFood = function(id, food) {
  console.log(id);
  return Recipe.findById(id)
  .then(recipe => {
    console.log('recipe', recipe);
    food.recipeId = recipe._id;
    this.tempRecipe = recipe;
    return new Food(food).save();
  })
  .then(food => {
    console.log('food', food);
    this.tempRecipe.food.push(food._id);
    this.tempFood = food;
    return this.tempRecipe.save();
  })
  .then(() => this.tempRecipe)
  .catch(err => Promise.reject(err));
};
