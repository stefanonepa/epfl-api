'use strict';
module.exports = function keyDataFilter(app) {
    var capabilities = {
        'internal': {
            reqIsValid: function (req) { return isInternal(req); },
            view: function (u) { return u }
        },
        'public': {
            reqIsValid: function (req) { return true; },
            view: function (u) { return u.asPublicData(); }
        }
    }

    function isInternal(req) {
        //TODO: validate the key
        return app.keyContext.keys.isValid(req.key);
    //return req.key === 'internal';
    }

    var middleware = function (req, res, next) {
        var ForbiddenException = require('epfl-exceptions').ForbiddenException;
        var cap;
        
        if (req.key === 'public') {
            cap = capabilities[req.key];
        } else {
            cap = capabilities['internal'];
        }
        
        if (!cap) {
            throw new ForbiddenException();
            return;
        }
        
        if (!cap.reqIsValid(req)) {
            // This query is not allowed from this client
            throw new ForbiddenException();
            return;
        }
        
        req.dataContext = require('../../data/ldap/context')(cap);
        next();
    };

    return middleware;
};
 
