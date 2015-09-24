'use strict';
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('./core/errorHandler');
var app = express();
var api = require('./api/_initializer.js');
var webApp = require('./app/_initializer.js');
var keyContext = require('./data/secrets/context')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Opt into Services
//https://github.com/expressjs/morgan
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'quoh8ukaechooBiong2eexeewa6pheuquengeiyedailae9EethohmeuDiecie5ahb2cat', resave: true,
    saveUninitialized: true }));

require('./core/security/tequilaConfig')(app);
keyContext.loadKeys();
app.keyContext = keyContext;

// set the public static resource folder
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

//Map the routes
api.init(app);
webApp.init(app);

app.get('/',  function (req, res) {
    res.render('homepage');
});

//TODO: Enable and Refine the errorHanlder
app.use(errorHandler);

app.listen(3000);
console.log('Listening on port 3000...');

module.exports = app;
