'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let RecipeSchema = new Schema({
  attributes: [{
    type: String
  }],
  calorieCount: {
    type: Number,
    required: [true, 'Calorie Count is required']
  },
  categories: [{
    type: String
  }],
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
    required: [true, 'Recipe name is required']
  },
  numberOfServings: {
    type: Number,
    required: [true, 'Number of Servings is required']
  },
  sourceLink: {
    type: String
  }
});

module.exports = mongoose.model('Recipes', RecipeSchema);