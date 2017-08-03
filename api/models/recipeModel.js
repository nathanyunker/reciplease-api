'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let RecipeSchema = new Schema({
  calorieCount: {
    type: Number,
    Required: 'Please enter the calorie count for the recipe.'
  },
  description: {
    type: String
  },
  directions: [{
    type: String
  }],
  ingredients: [{
    name: { type: String, default: '' },
    measure: { type: String, default: ''},
    value: { type: Number, default: 0}
  }],
  name: {
    type: String,
    Required: 'Please enter the name of the recipe.'
  },
  numberOfServings: {
    type: Number,
    Required: 'Please enter the calorie count for the recipe.'
  },
  sourceLink: {
    type: String
  }
});

module.exports = mongoose.model('Recipes', RecipeSchema);