let config = {
  "mongoURI": {
    development: 'mongodb://localhost/Recipedb',
    test: 'mongodb://localhost/Recipedb-test',
    production: 'mongodb://test:test@ds237979.mlab.com:37979/heroku_387j8fzm',
    useNewUrlParser: true
  },
  "auth": {
    secret: "allimportantauthsecret"
  }
};

module.exports = config;