//!! api have to define an init function !!
//define the routing system of the api, it 's called by server.js
"use strict";
(function (api) {
    require('fs').readdirSync(__dirname + '/').forEach(function (file) {
        var filename = __filename.slice(__dirname.length + 1);
        
        if (file.match(/\.js$/) !== null && file !== filename) {
            var name = file.replace('.js', '');
            var currentController = require("./" + name);
            
            api.init = function (app) {
                var currentRouter = require('express')();
                currentController.init(currentRouter);
                app.use('/api/' + name, currentRouter);
            };
        };
    });
})(module.exports);