"use strict";
(function (usersController) {
    usersController.init = function (app) {
        var urlValidator = require('./security/accessValidator');

        var getLdapInfoAndSendIt = function(req, res, sciper) {
            req.dataContext.users.getUserBySciper(req.sciper, function (result) {
                res.json(result);
            });
        }

        var checkSciper = function(req, next) {
            if (req.dataContext.validator.isSciperValid(req.sciper)) {
                next(req.sciper);
            } else {
                //TODO: Log or manage error: Param doesn't match
                throw('Error: Paramater sciper not valid!');
            }
        };
        
        app.get("/", urlValidator,  function (req, res) {
            req.sciper = req.query.sciper;
            checkSciper(req, function(validSciper) {
                getLdapInfoAndSendIt(req, res, validSciper);
            });
        });
        
        app.get("/:sciper", urlValidator, function (req, res) {
            req.sciper = req.params.sciper;
            checkSciper(req, function (validSciper) {
                getLdapInfoAndSendIt(req, res, validSciper);
            });
        });
        
        app.post('/', urlValidator, function (req, res) {
            req.sciper = req.body.sciper;
            checkSciper(req, function (validSciper) {
                getLdapInfoAndSendIt(req, res, validSciper);
            });
        });
    };
})(module.exports);