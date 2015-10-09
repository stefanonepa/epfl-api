'use strict';

var ParameterException = require('epfl-exceptions').ParameterException;
var validator = require('../core/security/inputValidators');
var render = require('./_render');
var handler = require('./_handler');

var controllers = {
    sciper: {
        name: 'sciper',
        isValid: validator.isUserSciperValid,
        validationException: new ParameterException({ message: 'Sciper not valid!', parameterName: 'sciper' }),
        model: "getUsersBySciper",
    },
    name: {
        name: 'name',
        isValid: validator.isUserNameQueryValid,
        validationException: new ParameterException({ message: 'Name not valid!', parameterName: 'name'  }),
        model: "getUsersByName"
    },
    search: {
        name: 'search',
        isValid: validator.isUserNameQueryValid,
        validationException: new ParameterException({ message: 'Name not valid!', parameterName: 'name'  }),
        model: "searchUserByName"
    },
    phone: {
        name: 'phone',
        isValid: validator.isUserPhoneValid,
        validationException: new ParameterException({ message: 'Phone not valid!', parameterName: 'phone' }),
        model: "getUsersByPhone"
    },
    unitAcronym: {
        name: 'unitAcronym',
        isValid: validator.isUnitAcronymValid,
        validationException: new ParameterException({ message: 'UnitAcronym not valid!', parameterName: 'unitAcronym' }),
        model: "getUsersByUnitAcronym"
    }
};

(function (usersController) {
    usersController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter')(app);

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
            handler(req, res, req.params.sciper, 'sciper', 'users', controllers);
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
            handler(req, res, req.params.name, 'name', 'users', controllers);
        });

        app.get('/search/:name', keyDataFilter, function(req, res) {
            handler(req, res, req.params.name, 'search', 'users', controllers);
        });

        app.get('/phone/:phone', keyDataFilter, function(req, res) {
            handler(req, res, req.params.phone, 'phone', 'users', controllers); 
        });

        app.get('/unit/:unitAcronym', keyDataFilter, function (req, res) {
            handler(req, res, req.params.unitAcronym, 'unitAcronym', 'users', controllers); 
        });
    };
})(module.exports);