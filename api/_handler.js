'use strict'
var render = require('./_render');

module.exports = function handler(req, res, value, actionName, routerName, controllers) {
    if (controllers[actionName].isValid(value)) {
        req.dataContext[routerName][controllers[actionName].model](value, function (data) {
            render(req, res, data, routerName);
        });
    } else {
        throw controllers[actionName].validationException;
    }
};