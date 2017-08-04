//During the test the env letiable is set to test
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let mockRecipes = require('./mockRecipes.json');
let Recipe = require('../api/models/recipeModel');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Recipes', function() {
  beforeEach((done) => {
    const newRecipe = new Recipe(mockRecipes.all[0]);

    newRecipe.save(function(err) {
      done();
    });
  });

  afterEach(function(done){
    Recipe.collection.drop();
    done();
  });

  describe('GET requests', function() {
    it('it should GET all the recipes', function(done) {
      chai.request(server)
          .get('/recipes')
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.recipes.should.be.a('array');
            res.body.recipes.length.should.equal(1);
            res.body.recipes[0].calorieCount.should.equal(mockRecipes.all[0].calorieCount);
            res.body.recipes[0].description.should.equal(mockRecipes.all[0].description);
            res.body.recipes[0].name.should.equal(mockRecipes.all[0].name);
            res.body.recipes[0].numberOfServings.should.equal(mockRecipes.all[0].numberOfServings);
            res.body.recipes[0].directions.length.should.equal(mockRecipes.all[0].directions.length);
            res.body.recipes[0].directions[0].should.equal(mockRecipes.all[0].directions[0]);
            res.body.recipes[0].ingredients.length.should.equal(mockRecipes.all[0].ingredients.length);
            res.body.recipes[0].ingredients[0].name.should.equal(mockRecipes.all[0].ingredients[0].name);
            res.body.recipes[0].ingredients[0].measure.should.equal(mockRecipes.all[0].ingredients[0].measure);
            res.body.recipes[0].ingredients[0].value.should.equal(mockRecipes.all[0].ingredients[0].value);
            res.body.recipes[0].ingredients[1].name.should.equal(mockRecipes.all[0].ingredients[1].name);
            res.body.recipes[0].ingredients[1].measure.should.equal(mockRecipes.all[0].ingredients[1].measure);
            res.body.recipes[0].ingredients[1].value.should.equal(mockRecipes.all[0].ingredients[1].value);
            done();
          });
    });

    it('should GET a single recipe on /recipes/:id', function(done) {
      chai.request(server)
          .get('/recipe/59822144e30ba809449c6fe2')
          .end(function(err,res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.recipe.should.be.a('object');
            res.body.recipe.calorieCount.should.equal(mockRecipes.all[0].calorieCount);
            res.body.recipe.description.should.equal(mockRecipes.all[0].description);
            res.body.recipe.name.should.equal(mockRecipes.all[0].name);
            res.body.recipe.numberOfServings.should.equal(mockRecipes.all[0].numberOfServings);
            res.body.recipe.directions.length.should.equal(mockRecipes.all[0].directions.length);
            res.body.recipe.directions[0].should.equal(mockRecipes.all[0].directions[0]);
            res.body.recipe.ingredients.length.should.equal(mockRecipes.all[0].ingredients.length);
            res.body.recipe.ingredients[0].name.should.equal(mockRecipes.all[0].ingredients[0].name);
            res.body.recipe.ingredients[0].measure.should.equal(mockRecipes.all[0].ingredients[0].measure);
            res.body.recipe.ingredients[0].value.should.equal(mockRecipes.all[0].ingredients[0].value);
            res.body.recipe.ingredients[1].name.should.equal(mockRecipes.all[0].ingredients[1].name);
            res.body.recipe.ingredients[1].measure.should.equal(mockRecipes.all[0].ingredients[1].measure);
            res.body.recipe.ingredients[1].value.should.equal(mockRecipes.all[0].ingredients[1].value);
            done();
          });
    });

    it('should receive an error if passed an invalid recipe id', function(done) {
      chai.request(server)
          .get('/recipe/asdffw2425345')
          .end(function(err, res) {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.messages[0].should.equal('Invalid Recipe ID');
            done();
          });
    });

    it('should get no recipes if recipeId cannot be found', function(done) {
      chai.request(server)
          .get('/recipe/59822144e30ba809449c6fe6')
          .end(function(err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.messages[0].should.equal('No Recipe Was Found With ID: ' + '59822144e30ba809449c6fe6');
            done();
          });
    });
  });

  describe('POST requests', function() {
    it('should ADD a single recipe on /recipe POST', function(done) {
      chai.request(server)
          .post('/recipes')
          .send(mockRecipes.all[1])
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.recipe.should.be.a('object');
            res.body.recipe.calorieCount.should.equal(mockRecipes.all[1].calorieCount);
            res.body.recipe.description.should.equal(mockRecipes.all[1].description);
            res.body.recipe.name.should.equal(mockRecipes.all[1].name);
            res.body.recipe.numberOfServings.should.equal(mockRecipes.all[1].numberOfServings);
            res.body.recipe.directions.length.should.equal(mockRecipes.all[1].directions.length);
            res.body.recipe.directions[0].should.equal(mockRecipes.all[1].directions[0]);
            res.body.recipe.ingredients.length.should.equal(mockRecipes.all[1].ingredients.length);
            res.body.recipe.ingredients[0].name.should.equal(mockRecipes.all[1].ingredients[0].name);
            res.body.recipe.ingredients[0].measure.should.equal(mockRecipes.all[1].ingredients[0].measure);
            res.body.recipe.ingredients[0].value.should.equal(mockRecipes.all[1].ingredients[0].value);
            done();
          });
    });

    it('should thrown an error if recipe has no name', function(done) {
      let recipeToAdd = Object.assign({}, mockRecipes.all[1]);
      delete recipeToAdd.name;

      chai.request(server)
          .post('/recipes')
          .send(recipeToAdd)
          .end(function(err, res) {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.messages[0].should.equal('Recipe name is required');
            done();
          });
    });
  });

  describe('PUT requests', function() {
    it('should update a single recipe on /recipe/:id', function(done) {
      chai.request(server)
          .put('/recipe/59822144e30ba809449c6fe2')
          .send(mockRecipes.all[1])
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.recipe.should.be.a('object');
            res.body.recipe._id.should.equal(mockRecipes.all[0]._id);
            res.body.recipe.calorieCount.should.equal(mockRecipes.all[1].calorieCount);
            res.body.recipe.description.should.equal(mockRecipes.all[1].description);
            res.body.recipe.name.should.equal(mockRecipes.all[1].name);
            res.body.recipe.numberOfServings.should.equal(mockRecipes.all[1].numberOfServings);
            res.body.recipe.directions.length.should.equal(mockRecipes.all[1].directions.length);
            res.body.recipe.directions[0].should.equal(mockRecipes.all[1].directions[0]);
            res.body.recipe.ingredients.length.should.equal(mockRecipes.all[1].ingredients.length);
            res.body.recipe.ingredients[0].name.should.equal(mockRecipes.all[1].ingredients[0].name);
            res.body.recipe.ingredients[0].measure.should.equal(mockRecipes.all[1].ingredients[0].measure);
            res.body.recipe.ingredients[0].value.should.equal(mockRecipes.all[1].ingredients[0].value);
            done();
          });
    });

    it('should receive an error if passed an invalid recipe id', function(done) {
      chai.request(server)
          .put('/recipe/asdf2')
          .send(mockRecipes.all[1])
          .end(function(err, res) {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.messages[0].should.equal('Invalid Recipe ID');
            done();
          });
    });

    it('should update no recipes if recipeId cannot be found', function(done) {
      chai.request(server)
          .put('/recipe/59822144e30ba809449c6fe6')
          .send(mockRecipes.all[1])
          .end(function(err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.messages[0].should.equal('No Recipe Was Found With ID: ' + '59822144e30ba809449c6fe6');
            done();
          });
    });
  });

  describe('DELETE requests', function() {
    it('should delete a recipe on /recipe/:id', function(done) {
      chai.request(server)
          .delete('/recipe/59822144e30ba809449c6fe2')
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.recipe.should.be.a('object');
            res.body.recipe.n.should.equal(1);
            res.body.recipe.ok.should.equal(1);
            done();
          });
    });

    it('should receive an error if passed an invalid recipe id', function(done) {
      chai.request(server)
          .delete('/recipe/asdf2')
          .end(function(err, res) {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.messages[0].should.equal('Invalid Recipe ID');
            done();
          });
    });

    it('should delete no recipes if recipeId cannot be found', function(done) {
      chai.request(server)
          .delete('/recipe/59822144e30ba809449c6fe5')
          .end(function(err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.messages[0].should.equal('No Recipe Was Found With ID: ' + '59822144e30ba809449c6fe5');
            done();
          });
    });
  });
});