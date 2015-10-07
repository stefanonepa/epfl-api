'use strict';
(function (usersController) {
    usersController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter')(app);
        var ParameterException = require('epfl-exceptions').ParameterException;
        var validator = require('../core/security/inputValidators');
        
        function showResult(req, res, results) {
            if (req.query.html != undefined) {
                res.render('users', {users: results});
            } else {
                res.json(results);
            }
        }

        app.get('/sciper/:sciper', keyDataFilter, function (req, res) {
            var sciper = req.params.sciper;
            if (validator.isUserSciperValid(sciper)) {
                req.dataContext.users.getUserBySciper(sciper, function(data) {
                    showResult(req, res, data);
                });
            } else {
                throw new ParameterException({message: 'Sciper not valid!', parameterName: 'sciper'});
            }
        });

        app.get('/name/:name', keyDataFilter, function (req, res) {

            var name = req.params.name;
            if (validator.isUserNameQueryValid(name)) {
                req.dataContext.users.getUserByName(name, function (data) {
                    showResult(req, res, data);
                });
            } else {
                throw new ParameterException({ message: 'Name not valid!', parameterName: 'name' });
            }
        });

        app.get('/search/:name', keyDataFilter, function(req, res) {
            req.dataContext.users.searchUserByName(req.params.name, function (data) {
                showResult(req, res, data);
            });
        });

        app.get('/phone/:phone', keyDataFilter, function(req, res) {
            req.dataContext.users.searchUserByPhone(req.params.phone, function (data) {
                showResult(req, res, data);
            });
        });

        app.get('/unit/:unitAcronym', keyDataFilter, function (req, res) {
            req.dataContext.users.searchUserByUnitAcronym(req.params.unitAcronym, function (data) {
                showResult(req, res, data);
            });
        });
    };
})(module.exports);