'use strict';
module.exports = function render(req, res, results, routerName) {
    var unic = req.query.unique;
    
    if (req.query.html != undefined) {
        var returnedObject = {};
        returnedObject[routerName] = results;
        res.render(routerName, returnedObject);
    } else {
        if (unic && results.length !== 1) {
            res.json({
                status: 'error',
                details: (results.length === 0 ? 'No results':
                            'Too many results')
            });
        } else {
            res.json({ status: 'ok', url: req.originalUrl, results: results });
        }
    }
};