"use strict";
(function (usersController) {
    usersController.init = function (app) {
        var ldapContext = require("../data/ldap");
        
        var getLdapInfoAndSendIt = function(res, sciper) {
            ldapContext.users.getUserBySciper(sciper, function (result) {
                res.json(ldapContext.factories.User(result));
            });
        }

        var checkSciper = function(sciper, next) {
            if (ldapContext.validator.isSciperValid(sciper)) {
                next(sciper);
            } else {
                //TODO: Log or manage error: Param doesn't match
                throw('Error: Paramater sciper not valid!');
            }
        };
        
        app.get("/", function (req, res) {
            var sciper = req.query.sciper;
            checkSciper(sciper, function(validSciper) {
                getLdapInfoAndSendIt(res, validSciper);
            });
        });
        
        app.get("/:sciper", function (req, res) {
            var sciper = req.params.sciper;
            checkSciper(sciper, function (validSciper) {
                getLdapInfoAndSendIt(res, validSciper);
            });
        });
        
        app.post('/', function (req, res) {
            var sciper = req.body.sciper;
            checkSciper(sciper, function (validSciper) {
                getLdapInfoAndSendIt(res, validSciper);
            });
        });
    };
})(module.exports);