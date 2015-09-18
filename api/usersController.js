"use strict";
var ParameterException = require('../core/exceptions').ParameterException;

(function (usersController) {
    usersController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter');
        
        function showResult(req, res, results) {
            if (req.query.html != undefined) {
                res.render('users', { users: results });
            } else {
                res.json(results);
            }
        }

        //app.get("/", keyDataFilter,  function (req, res) {
        //    req.sciper = req.query.sciper;
        //    getLdapInfoAndSendIt(req, res);
        //});
        
        app.get("/sciper/:sciper", keyDataFilter, function (req, res) {

            if (req.dataContext.validator.isSciperValid(req.params.sciper)) {
                req.sciper = req.params.sciper;
                req.dataContext.users.getUserBySciper(req, res, showResult);
            } else {
                throw new ParameterException({message: 'Sciper not valid!', parameterName: 'sciper'});
            }
            
        });

        app.get("/name/:name", keyDataFilter, function(req, res) {
            req.name = req.params.name;
            req.dataContext.users.getUserByName(req, res, showResult);
        });

        app.get("/search/:name", keyDataFilter, function(req, res) {
            req.name = req.params.name;
            req.dataContext.users.searchUserByName(req, res, showResult);
        });

        /*app.post('/', keyDataFilter, function (req, res) {
            req.sciper = req.body.sciper;
            getLdapInfoAndSendIt(req, res);
        });*/
    };
})(module.exports);