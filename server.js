let express = require('express');
let app = express();
let config = require('./dbconfig');
let port = process.env.PORT || 3000;
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/recipeRoutes');
routes(app);


let server = app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

module.exports = server;