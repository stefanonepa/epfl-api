'use strict';

var ParameterException = require('epfl-exceptions').ParameterException;
var validator = require('../core/security/inputValidators');

var controllers = {
    sciper: {
        isValid: validator.isUserSciperValid,
        model: "getUsersBySciper"
    },
    name: {
        isValid: validator.isUserNameQueryValid,
        model: "getUsersByName"
    },
    search: {
        isValid: validator.isUserNameQueryValid,
        model: "searchUserByName"
    },
    phone: {
        isValid: validator.isUserPhoneValid,
        model: "getUsersByPhone"
    }
};

(function (usersController) {
    usersController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter')(app);

        function showResult(req, res, results) {
            var unic = req.query.unique;

            if (req.query.html != undefined) {
                res.render('users', {users: results});
            } else {
                if (unic && results.length !== 1) {
                    res.json({
                        status: "error",
                        details: (results.length == 0 ? "No results":
                            "Too many results")
                    });
                } else {
                    res.json({status: "ok", results: results});
                }
            }
        }

        function handler(req, res, value, validatorName){
            if (controllers[validatorName].isValid(value)) {
                req.dataContext.users.getUsersBySciper(sciper, function(data) {
                    showResult(req, res, data);
                });
            } else {
                throw new ParameterException({message: 'Sciper not valid!', parameterName: 'sciper'});
            }
        };

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
            if (controllers["sciper"].isValid(sciper)) {
                req.dataContext.users.getUsersBySciper(sciper, function(data) {
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
            if (controllers["name"].isValid(name)) {
                req.dataContext.users.getUsersByName(name, function (data) {
                    showResult(req, res, data);
                });
            } else {
                throw new ParameterException({ message: 'Name not valid!', parameterName: 'name' });
            }
        });

        app.get('/search/:name', keyDataFilter, function(req, res) {
            var name = req.params.name;
            if (controllers["name"].isValid(name)) {
                req.dataContext.users.searchUserByName(name, function (data) {
                    showResult(req, res, data);
                });
            }
        });

        app.get('/phone/:phone', keyDataFilter, function(req, res) {
            var phone =req.params.phone;
            if (controllers["phone"].isValid(phone)) {
                req.dataContext.users.getUsersByPhone(phone, function (data) {
                    showResult(req, res, data);
                });
            }
        });

        app.get('/unit/:unitAcronym', keyDataFilter, function (req, res) {
            req.dataContext.users.getUsersByUnitAcronym(req.params.unitAcronym, function (data) {
                showResult(req, res, data);
            });
        });
    };
})(module.exports);