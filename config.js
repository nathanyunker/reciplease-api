let config = {};

config.mongoURI = {
  development: 'mongodb://localhost/Recipedb',
  test: 'mongodb://localhost/Recipedb-test'
};

config.jwt = {
  jwtSecret: "My cat wears sunglasses"
}

module.exports = config;