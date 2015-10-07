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
        
        /**
        * @api {get} /public/user/sciper/:sciper Request User information by SCIPER
        * @apiName GetUserBySciper
        * @apiGroup User
        * @apiVersion 0.0.1
        * @apiParam {Sciper} sciper Users unique EPFL-Sciper.
        *
        * @apiSuccess {Object} Epfl informations of the User.
        * 
        * @apiError UserNotFound The sciper of the User was not found.
        *
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 404 Not Found
        *     {
        *       "error": "UserNotFound"
        *     }
        *
        */
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
        
        /**
        * @api {get} /public/user/name/:name Request User information by NAME
        * @apiName GetUserByName
        * @apiGroup User
        * @apiVersion 0.0.1
        * @apiParam {String} name
        *
        * @apiSuccess {Array} Epfl informations of Users.
        * 
        * @apiError UserNotFound The name of the User was not found.
        *
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 404 Not Found
        *     {
        *       "error": "UserNotFound"
        *     }
        *
        */
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