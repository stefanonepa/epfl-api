"use strict";
(function (errorController) {
    errorController.init = function (app) {
        
        app.get('/403', function (req, res) {
            console.log('error: 403 Forbiden access ' + req.url);
            res.status(403).send('Forbidden');
        });

        app.get('/500', function (req, res) {
            console.log('error: 500 Server error ' + req.url);
            res.status(500).send('Server Error');
        });
    };
})(module.exports);