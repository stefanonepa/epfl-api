//!! api have to define an init function !!
//called by server.js it define the routing system of the api's if the file name doesn't start with '_'
'use strict';
(function (api) {
    api.init = function (app) {
        require('fs').readdirSync(__dirname + '/').forEach(function (file) {
            if (file.match(/\.js$/) !== null && file.charAt(0) !== '_') {
                var name = file.replace('.js', '');
                var currentController = require('./' + name);
                var currentRouter = require('express')();
                currentRouter.keyContext = app.keyContext;
                currentRouter.middlewares = app.middlewares;

                //Accept request from all origins
                currentRouter.use(function(req, res, next) {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Methods', 'GET');
                    next();
                });

                currentController.init(currentRouter);
                app.use('/api/:key/' + name.replace('Controller', ''), currentRouter);
                app.param('key', function (req, res, next, key) {
                    req.key = key;
                    next();
                });
            };
        });
    };
})(module.exports);