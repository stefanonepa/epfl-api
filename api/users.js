"use strict";
(function (usersController) {
    usersController.init = function (app) {
        var urlValidator = require('./security/accessValidator');

        var getLdapInfoAndSendIt = function(req, res) {
            if (req.dataContext.validator.isSciperValid(req.sciper)) {
                //sciper is valid
                req.dataContext.users.getUserBySciper(req.sciper, function (result) {
                    if (req.query.html != undefined) {
                        res.render('user', { user: result });
                    } else {
                        res.json(result);                      
                    }
                });
            } else {
                //TODO: Log or manage error: Param doesn't match
                throw('Error: Paramater sciper not valid!');
            }
        };
        
        //app.get("/", urlValidator,  function (req, res) {
        //    req.sciper = req.query.sciper;
        //    getLdapInfoAndSendIt(req, res);
        //});
        
        app.get("/sciper/:sciper", urlValidator, function (req, res) {

            if (req.dataContext.validator.isSciperValid(req.params.sciper)) {
                //sciper is valid
                req.dataContext.users.getUserBySciper(req.params.sciper, function (result) {
                    if (req.query.html != undefined) {
                        res.render('user', { user: result });
                    } else {
                        res.json(result);
                    }
                });
            } else {
                //TODO: Log or manage error: Param doesn't match
                throw ('Error: Paramater sciper not valid!');
            }
            
        });

        app.get("/name/:name", urlValidator, function (req, res) {
            req.dataContext.users.getUserByName(req.params.name, function(result) {
                if (req.query.html != undefined) {
                    res.render('users', { users: result });
                } else {
                    res.json(result);
                }
            });
        });
        
        /*app.post('/', urlValidator, function (req, res) {
            req.sciper = req.body.sciper;
            getLdapInfoAndSendIt(req, res);
        });*/
    };
})(module.exports);