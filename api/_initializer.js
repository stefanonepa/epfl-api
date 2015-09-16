//!! api have to define an init function !!
//called by server.js it define the routing system of the api's if the file name doesn't start with '_'
"use strict";
(function (api) {
    api.init = function (app) {
        require('fs').readdirSync(__dirname + '/').forEach(function (file) {
            var filename = __filename.slice(__dirname.length + 1);
        
            if (file.match(/\.js$/) !== null && file.charAt(0) !== '_') {
                var name = file.replace('.js', '');
                var currentController = require("./" + name);
                var currentRouter = require('express')();

                currentController.init(currentRouter);
                app.use('/api/:key/' + name, currentRouter);
                app.param('key', function (req, res, next, key) {
                    req.key = key;
                    next();
                });
            };
        });
    };
})(module.exports);