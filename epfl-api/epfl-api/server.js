var http = require('http');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('./core/errorHandler');
var app = express();
var api = require('./api/_initializer.js');

// Opt into Services
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the public static resource folder
app.use(express.static(__dirname + '/public'));

//Map the routes
api.init(app);
//TODO: Enable and Refine the errorHanlder
//app.use(errorHandler);

app.listen(3000);
console.log('Listening on port 3000...');