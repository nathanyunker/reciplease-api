let express = require('express');
let app = express();
let config = require('./config/main.js');
let port = process.env.PORT || 3000;
let mongoose = require('mongoose');
var bodyParser = require('body-parser');  
var morgan = require('morgan');  
var passport = require('passport');  
  
mongoose.Promise = global.Promise;

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

mongoose.connect(config.mongoURI[app.settings.env], function(err, database) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
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

//Using passport security
app.use(passport.initialize());  
app.use(passport.session());
require('./config/passport')(passport);  

//TODO: re-evaluate the following half-dozen lines
app.use(morgan('dev'));
// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {  
  res.send('Relax. We will put the home page here later.');
});

let recipeRoutes = require('./api/routes/recipeRoutes');
let userRoutes = require('./api/routes/userRoutes');
recipeRoutes(app);
userRoutes(app);


let server = app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

module.exports = server;