var http = require("http");
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//var session = require('express-session');
//var cookieParser = require('cookie-parser');
var app = express();
var api = require('./api/_initializer.js');

// Opt into Services
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({ secret: "EPFL-Magic-Unicorn-API" }));
//app.use(cookieParser());

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Map the routes
api.init(app);

app.listen(3000);
console.log('Listening on port 3000...');