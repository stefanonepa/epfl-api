'use strict'
var render = require('./_render');
var NodeCache = require("node-cache");
var apiCache = new NodeCache();


module.exports = function handler(req, res, value, routerName, action) {
    if (action.isValid(value)) {
        console.log("originalUrl: " + req.originalUrl);
        apiCache.get(req.originalUrl, function (err, data) {
            if (!err) {
                if (data == undefined) {
                    req.dataContext[routerName][action.model](value, function (data) {
                        apiCache.set(req.originalUrl, data, function (err, success) {
                            if (!err && success) {
                                console.log("Cache set to " + JSON.stringify(data));
                            }
                            render(req, res, data, routerName);
                        });
                    });
                } else {
                    render(req, res, data, routerName);
                    console.log("Valeur du cache " + JSON.stringify(data));
                }
            }
        });
    } else {
        throw action.validationException;
    }
};