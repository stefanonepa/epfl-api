"use strict";
(function (unitsController) {
    unitsController.init = function (app) {
        var urlValidator = require('./security/accessValidator');

        function showResult(req, res, results) {
            if (req.query.html != undefined) {
                res.render('units', { units: results });
            } else {
                res.json(results);
            }
        }

        app.get("/name/:unitName", urlValidator, function(req, res) {
            console.log("unit: "+req.params.unitName);
            req.unit = req.params.unitName;
            req.dataContext.units.getUnitByName(req, res, showResult);
        });

        app.get("/search/:unitName", urlValidator, function(req, res) {
            console.log("unit: "+req.params.unitName);
            req.unit = req.params.unitName;
            req.dataContext.units.searchUnitByName(req, res, showResult);
        });
    };
})(module.exports);