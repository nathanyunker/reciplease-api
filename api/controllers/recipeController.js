'use strict';

let Recipe = require('../models/recipeModel');
let recipeUtility = require('../utilities/recipeUtilities');

exports.list_all_recipes = function(req, res) {
  Recipe.find({}, function(err, recipes) {
    let response = {};

    if (err) {
      response.messages = ["Unknown Service Error"];
    } else {
      response.recipes = recipes;
    }

    res.json(response);
  });
};


exports.create_a_recipe = function(req, res) {
  let new_recipe = new Recipe(req.body);

  new_recipe.save(function(err, recipe) {
    let response = {};
    let statusCode = 200;

    if (err) {
      response.messages = recipeUtility.checkRecipeValidity(err.errors);
      statusCode = recipeUtility.checkStatusCode(err);
    } else {
      response.recipe = recipe;
      statusCode = 200;
    }

    res.json(statusCode, response);
  });
};


exports.read_a_recipe = function(req, res) {
  Recipe.findById(req.params.recipeId, function(err, recipe) {
    let response = {};
    let statusCode = 200;

    if (err) {
      response.messages = [recipeUtility.checkRecipeIdValidity(err)];
      statusCode = recipeUtility.checkStatusCode(err);
    } else {
      if (recipe === null || recipe === undefined) {
        response.messages = ["No Recipe Was Found With ID: " + req.params.recipeId];
        statusCode = 404;
      } else {
        response.recipe = recipe;
      }
    }

    res.json(statusCode, response);
  });
};


exports.update_a_recipe = function(req, res) {
  Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true}, function(err, recipe) {
    let response = {};
    let statusCode = 200;

    if (err) {
      response.messages = [recipeUtility.checkRecipeIdValidity(err)];
      statusCode = recipeUtility.checkStatusCode(err);
    } else {
      if (recipe === null) {
        response.messages = ["No Recipe Was Found With ID: " + req.params.recipeId];
        statusCode = 404;
      } else {
        response.recipe = recipe;
      }
    }

    res.json(statusCode, response);
  });
};


exports.delete_a_recipe = function(req, res) {
  Recipe.remove({_id: req.params.recipeId}, function(err, recipe) {
    let response = {};
    let statusCode = 200;

    if (err) {
      response.messages = [recipeUtility.checkRecipeIdValidity(err)];
      statusCode = recipeUtility.checkStatusCode(err);
    } else {
      console.log('WHAT IS THE RECIPE IN THIS SITUATION-0----------------------', recipe);
      if (recipe.n === 0) {
        response.messages = ["No Recipe Was Found With ID: " + req.params.recipeId];
        statusCode = 404;
      } else {
        response.recipe = recipe.result;
      }
    }

    res.json(statusCode, response);
  });
};