'use strict';
(function (unitsController) {
    unitsController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter')(app);
        var ParameterException = require('epfl-exceptions').ParameterException;
        var validator = require('../core/security/inputValidators');

        function showResult(req, res, results) {
            if (req.query.html != undefined) {
                res.render('units', {units: results});
            } else {
                res.json(results);
            }
        }
        
        app.get('/id/:id', keyDataFilter, function (req, res) {
            req.dataContext.units.getUnitById(req.params.id, function (data) {
                showResult(req, res, data);
            });
        });

        app.get('/name/:unitName', keyDataFilter, function (req, res) {
            var unitName = req.params.unitName;
            if (validator.isUnitAcronymValid(unitName)) {
                req.dataContext.units.getUnitByName(unitName, function (data) {
                    showResult(req, res, data);
                });
            } else {
                throw new ParameterException({ message: 'Unitname not valid!', parameterName: 'unitname' });
            }
        });

        app.get('/search/:unitName', keyDataFilter, function(req, res) {
            req.dataContext.units.searchUnitByName(req.params.unitName, function (data) {
                showResult(req, res, data);
            });
        });
    };
})(module.exports);