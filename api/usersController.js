'use strict';

var ParameterException = require('epfl-exceptions').ParameterException;
var validator = require('../core/security/inputValidators');

var controllers = {
    sciper: {
        isValid: validator.isUserSciperValid,
        validationException: new ParameterException({ message: 'Sciper not valid!', parameterName: 'sciper' }),
        model: "getUsersBySciper",
    },
    name: {
        isValid: validator.isUserNameQueryValid,
        validationException: new ParameterException({ message: 'Name not valid!', parameterName: 'name'  }),
        model: "getUsersByName"
    },
    search: {
        isValid: validator.isUserNameQueryValid,
        validationException: new ParameterException({ message: 'Name not valid!', parameterName: 'name'  }),
        model: "searchUserByName"
    },
    phone: {
        isValid: validator.isUserPhoneValid,
        validationException: new ParameterException({ message: 'Phone not valid!', parameterName: 'phone' }),
        model: "getUsersByPhone"
    },
    unitAcronym: {
        isValid: validator.isUnitAcronymValid,
        validationException: new ParameterException({ message: 'UnitAcronym not valid!', parameterName: 'unitAcronym' }),
        model: "getUsersByUnitAcronym"
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

        function handler(req, res, value, actionName){
            if (controllers[actionName].isValid(value)) {
                req.dataContext.users[controllers[actionName].model](value, function(data) {
                    showResult(req, res, data);
                });
            } else {
                throw controllers[actionName].validationException;
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
            handler(req, res, req.params.sciper, 'sciper');
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
            handler(req, res, req.params.name, 'name');
        });

        app.get('/search/:name', keyDataFilter, function(req, res) {
            handler(req, res, req.params.name, 'search');
        });

        app.get('/phone/:phone', keyDataFilter, function(req, res) {
            handler(req, res, req.params.phone, 'phone'); 
        });

        app.get('/unit/:unitAcronym', keyDataFilter, function (req, res) {
            handler(req, res, req.params.unitAcronym, 'unitAcronym'); 
        });
    };
})(module.exports);