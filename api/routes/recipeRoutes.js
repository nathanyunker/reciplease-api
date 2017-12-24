'use strict';
module.exports = function(app) {
  let recipe = require('../controllers/recipeController');
  let user = require('../controllers/userController');
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
    .post(passport.authenticate('login', function(err, user1, info) {
      if (err) { user.login(err); }
      if (!user1) { user.login() }
      console.log('THE err', err);
      console.log('THE user', user);
      console.log('THE info', info);
    }));

  app.route('/signup')
    .post(passport.authenticate('signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash : true 
    }));
};
