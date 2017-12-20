'use strict';
module.exports = function(app) {
  let recipe = require('../controllers/recipeController');
  const passport = require('passport')

  //TODO move this into pass port service
  var isAuthenticated = function (req, res, next) {
    //check for token here
    if (req.isAuthenticated()){
      return next();
    } else {
      let response = {
        messages: [{message: "No token present. Please authorize"}]
      }
      res.json(401, response);
    }
  }

  app.route('/recipes')
    .get(
      isAuthenticated, function(req, res){
        return recipe.list_all_recipes;
      })
    .post(recipe.create_a_recipe);


  app.route('/recipe/:recipeId')
    .get(recipe.read_a_recipe)
    .put(recipe.update_a_recipe)
    .delete(recipe.delete_a_recipe);

  app.route('/login')
    .post(passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true 
    }));

  app.route('/signup')
    .post(passport.authenticate('signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash : true 
    }));
};
