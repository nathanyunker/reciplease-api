var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Recipe = require('./api/models/recipeModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Recipedb'); 

// Add headers for CORS
app.use(function (req, res, next) {

    // Website allowed to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true to include cookies in the requests sent
    // to the API (e.g. if using sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/recipeRoutes');
routes(app);


app.listen(port);

// reference https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
console.log('todo list RESTful API server started on: ' + port);