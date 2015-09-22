"use strict";
(function (unitsController) {
    unitsController.init = function (app) {
        var keyDataFilter = require('../core/security/keyDataFilter');

        function showResult(req, res, results) {
            if (req.query.html != undefined) {
                res.render('units', {units: results});
            } else {
                res.json(results);
            }
        }
        
        app.get("/id/:id", keyDataFilter, function (req, res) {
            console.log("unit: " + req.params.id);
            req.accountingNumber = req.params.id;
            req.dataContext.units.getUnitById(req, res, showResult);
        });

        app.get("/name/:unitName", keyDataFilter, function(req, res) {
            console.log("unit: "+req.params.unitName);
            req.unit = req.params.unitName;
            req.dataContext.units.getUnitByName(req, res, showResult);
        });

        app.get("/search/:unitName", keyDataFilter, function(req, res) {
            console.log("unit: "+req.params.unitName);
            req.unit = req.params.unitName;
            req.dataContext.units.searchUnitByName(req, res, showResult);
        });
    };
})(module.exports);