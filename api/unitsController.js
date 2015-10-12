'use strict';

var ParameterException = require('epfl-exceptions').ParameterException;
var validator = require('../core/security/inputValidators');
var render = require('./_render');
var handler = require('./_handler');

var controllers = {
    id: {
        name: 'id',
        isValid: validator.isUnitIdValid,
        validationException: new ParameterException({ message: 'Id not valid!', parameterName: 'id' }),
        model: "getUnitById",
    },
    name: {
        name: 'name',
        isValid: validator.isUnitAcronymValid,
        validationException: new ParameterException({ message: 'Unitname not valid!', parameterName: 'unitName' }),
        model: "getUnitByName"
    },
    search: {
        name: 'search',
        isValid: validator.isUnitAcronymValid,
        validationException: new ParameterException({ message: 'Unitname not valid!', parameterName: 'unitName' }),
        model: "searchUnitByName"
    }
};

(function (unitsController) {
    unitsController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter')(app);
        
        app.get('/id/:id', keyDataFilter, function (req, res) {
            handler(req, res, req.params.id, 'units', controllers.id);
        });

        app.get('/name/:unitName', keyDataFilter, function (req, res) {
            handler(req, res, req.params.unitName, 'units', controllers.name);
        });

        app.get('/search/:unitName', keyDataFilter, function(req, res) {
            handler(req, res, req.params.unitName, 'units', controllers.search);
        });
    };
})(module.exports);