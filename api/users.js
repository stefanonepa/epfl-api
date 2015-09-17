"use strict";
(function (usersController) {
    usersController.init = function (app) {
        var urlValidator = require('./security/accessValidator');
        
        function showResult(req, res, results) {
            if (req.query.html != undefined) {
                res.render('users', { users: results });
            } else {
                res.json(results);
            }
        }

        //app.get("/", urlValidator,  function (req, res) {
        //    req.sciper = req.query.sciper;
        //    getLdapInfoAndSendIt(req, res);
        //});
        
        app.get("/sciper/:sciper", urlValidator, function (req, res) {

            if (req.dataContext.validator.isSciperValid(req.params.sciper)) {
                req.sciper = req.params.sciper;
                req.dataContext.users.getUserBySciper(req, res, showResult);
            } else {
                //TODO: Log or manage error: Param doesn't match
                throw ('Error: Parameter sciper not valid!');
            }
            
        });

        app.get("/name/:name", urlValidator, function(req, res) {
            req.name = req.params.name;
            req.dataContext.users.getUserByName(req, res, showResult);
        });

        app.get("/search/:name", urlValidator, function(req, res) {
            req.name = req.params.name;
            req.dataContext.users.searchUserByName(req, res, showResult);
        });

        /*app.post('/', urlValidator, function (req, res) {
            req.sciper = req.body.sciper;
            getLdapInfoAndSendIt(req, res);
        });*/
    };
})(module.exports);