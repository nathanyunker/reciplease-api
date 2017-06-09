'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeSchema = new Schema({
  name: {
    type: String,
    Required: 'Please enter the name of the recipe.'
  },
  description: {
    type: String
  },
  calorieCount: {
    type: Number,
    Required: 'Please enter the calorie count for the recipe.'
  },
  ingredients: [{
    name: { type: String, default: '' },
    measure: { type: String, default: ''},
    value: { type: Number, default: 0}
  }]
});

module.exports = mongoose.model('Recipes', RecipeSchema);