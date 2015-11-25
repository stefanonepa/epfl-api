'use strict';
var render = require('./_render');

module.exports = function handler(req, res, value, routerName, action) {
    if (action.isValid(value)) {
        req.dataContext[routerName][action.model](value, function (err, data) {
            if (err === null) {
                render(req, res, data, routerName);
            } else {
                throw new require('epfl-exceptions').ServerException();
            }
            
        });
    } else {
        throw action.validationException;
    }
};