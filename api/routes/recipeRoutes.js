'use strict';
module.exports = function(app) {
  var recipe = require('../controllers/recipeController');


  // todoList Routes
  app.route('/recipes')
    .get(recipe.list_all_recipes)
    .post(recipe.create_a_recipe);


  app.route('/recipes/:recipeId')
    .get(recipe.read_a_recipe)
    .put(recipe.update_a_recipe)
    .delete(recipe.delete_a_recipe);
};
