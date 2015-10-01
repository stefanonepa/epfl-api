'use strict';
(function (usersController) {
    usersController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter')(app);
        var ParameterException = require('epfl-exceptions').ParameterException;
        
        function showResult(req, res, results) {
            if (req.query.html != undefined) {
                res.render('users', {users: results});
            } else {
                res.json(results);
            }
        }

        app.get('/sciper/:sciper', keyDataFilter, function (req, res) {

            if (req.dataContext.validator.isUserSciperValid(req.params.sciper)) {
                req.sciper = req.params.sciper;
                req.dataContext.users.getUserBySciper(req, res, showResult);
            } else {
                throw new ParameterException({message: 'Sciper not valid!', parameterName: 'sciper'});
            }

        });

        app.get('/name/:name', keyDataFilter, function (req, res) {

            var name = req.params.name;
            if (req.dataContext.validator.isUserNameQueryValid(name)) {
                req.name = name;
                req.dataContext.users.getUserByName(req, res, showResult);
            } else {
                throw new ParameterException({ message: 'Name not valid!', parameterName: 'name' });
            }

        });

        app.get('/search/:name', keyDataFilter, function(req, res) {
            req.name = req.params.name;
            req.dataContext.users.searchUserByName(req, res, showResult);
        });

        app.get('/phone/:phone', keyDataFilter, function(req, res) {
            req.phone = req.params.phone;
            req.dataContext.users.searchUserByPhone(req, res, showResult);
        });

        app.get('/unit/:unitAcronym', keyDataFilter, function (req, res) {
            req.unitAcronym = req.params.unitAcronym;
            req.dataContext.users.searchUserByUnitAcronym(req, res, showResult);
        });
    };
})(module.exports);