//!! api have to define an init function !!
//define the routing system of the api, it 's called by server.js
"use strict";
(function (api) {
    api.init = function (app) {
        require('fs').readdirSync(__dirname + '/').forEach(function (file) {
            var filename = __filename.slice(__dirname.length + 1);
        
            if (file.match(/\.js$/) !== null && file !== filename) {
                var name = file.replace('.js', '');
                var currentController = require("./" + name);
                var currentRouter = require('express')();

                currentController.init(currentRouter);
                app.use('/api/:key/' + name, currentRouter);
                app.param('key', function (req, res, next, key) {
                    console.log('key: %s', key);
                    req.key = key;
                    next();
                });
            } else if (file === 'error.js') {
                var errorController = require('./error');
                var errorRouter = require('express')();
                errorController.init(errorRouter);

                app.use('/api/error', errorRouter);
                app.use('/api/:key/error', errorRouter);
                app.use('/api/:key/:controller/error', errorRouter);
                
            };
        });
    };
})(module.exports);