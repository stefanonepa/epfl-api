"use strict";
(function (usersController) {
    usersController.init = function (app) {
        var urlValidator = require('./security/accessValidator');

        var getLdapInfoAndSendIt = function(req, res) {
            if (req.dataContext.validator.isSciperValid(req.sciper)) {
                //sciper is valid
                req.dataContext.users.getUserBySciper(req.sciper, function (result) {
                    res.json(result);
                });
            } else {
                //TODO: Log or manage error: Param doesn't match
                throw('Error: Paramater sciper not valid!');
            }
        };
        
        app.get("/", urlValidator,  function (req, res) {
            req.sciper = req.query.sciper;
            getLdapInfoAndSendIt(req, res);
        });
        
        app.get("/:sciper", urlValidator, function (req, res) {
            req.sciper = req.params.sciper;
            getLdapInfoAndSendIt(req, res);
        });
        
        app.post('/', urlValidator, function (req, res) {
            req.sciper = req.body.sciper;
            getLdapInfoAndSendIt(req, res);
        });
    };
})(module.exports);