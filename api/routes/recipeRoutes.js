'use strict';
module.exports = function(app) {
  let recipe = require('../controllers/recipeController');

  app.route('/recipes')
    .get(recipe.list_all_recipes)
    .post(recipe.create_a_recipe);


  app.route('/recipe/:recipeId')
    .get(recipe.read_a_recipe)
    .put(recipe.update_a_recipe)
    .delete(recipe.delete_a_recipe);
};
