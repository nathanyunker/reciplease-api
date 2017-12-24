'use strict';

let User = require('../models/userModel');

exports.login = function(req, res) {
    console.log('SHOULD PRINT ON OUT')
    res.json(200, {message: 'hi'});
//   let new_recipe = new Recipe(req.body);

//   new_recipe.save(function(err, recipe) {
//     let response = {};
//     let statusCode = 200;

//     if (err) {
//       response.messages = recipeUtility.checkRecipeValidity(err.errors);
//       statusCode = recipeUtility.checkStatusCode(err);
//     } else {
//       response.recipe = recipe;
//       statusCode = 200;
//     }

//     res.json(statusCode, response);
//   });
};