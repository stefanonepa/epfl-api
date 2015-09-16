var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('./core/errorHandler');
var app = express();
var api = require('./api/_initializer.js');

// Opt into Services
//https://github.com/expressjs/morgan
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the public static resource folder
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

//Map the routes
api.init(app);
//TODO: Enable and Refine the errorHanlder
//app.use(errorHandler);

app.listen(3000);
console.log('Listening on port 3000...');