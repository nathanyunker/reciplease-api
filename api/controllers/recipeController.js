'use strict';

var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipes'),
  recipeUtility = require('../utilities/recipeUtilities');

exports.list_all_recipes = function(req, res) {
  Recipe.find({}, function(err, recipes) {
    var response = {};

    if (err) {
      response.message = "Unknown Service Error";
    } else {
      response.recipes = recipes;
    }

    res.json(response);
  });
};


exports.create_a_recipe = function(req, res) {
  var new_recipe = new Recipe(req.body);
  var response = {};

  new_recipe.save(function(err, recipe) {
    if (err) {
      response.messages = "Unknown Service Error";
    } else {
      response.recipe = recipe;
    }

    res.json(response);
  });
};


exports.read_a_recipe = function(req, res) {
  Recipe.findById(req.params.recipeId, function(err, recipe) {
    var response = {};

    if (err) {
      response.message = recipeUtility.checkRecipeIdValidity(err);
      res.json(response);
    } else {
      if (recipe === null) {
        response.message = "No Recipe Was Found With ID: " + req.params.recipeId
      } else {
        response.recipe = recipe;
      }

      res.json(response);
    }
  });
};


exports.update_a_recipe = function(req, res) {
  Recipe.findOneAndUpdate(req.params.recipeId, req.body, {new: true}, function(err, recipe) {
    if (err) {
      response.message = "Unknown Service Error";
    } else {
      response.recipe = recipe;
    }

    res.json(response);
  });
};


exports.delete_a_recipe = function(req, res) {
  Recipe.remove({_id: req.params.recipeId}, function(err, recipe) {
    if (err) {
      response.messages = recipeUtility.checkRecipeIdValidity(err);
    } else {
      response.recipe = recipe;
    }

    res.json(response);
  });
};