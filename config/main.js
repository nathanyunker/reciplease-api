let config = {
  "mongoURI": {
    development: 'mongodb://localhost/Recipedb',
    test: 'mongodb://localhost/Recipedb-test'
  },
  "auth": {
    secret: "allimportantauthsecret"
  }
};

module.exports = config;