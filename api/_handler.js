'use strict'
var render = require('./_render');

module.exports = function handler(req, res, value, routerName, action) {
    if (action.isValid(value)) {
        req.dataContext[routerName][action.model](value, function (data) {
            render(req, res, data, routerName);
        });
    } else {
        throw action.validationException;
    }
};