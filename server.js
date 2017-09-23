let express = require('express');
let app = express();
let config = require('./dbconfig');
let port = process.env.PORT || 3000;
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

mongoose.connect(process.env.MONGODB_URI, function(err, database) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + process.env.MONGODB_URI);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
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