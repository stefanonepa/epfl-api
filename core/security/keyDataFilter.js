"use strict";

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

function isInternal(req){
    //TODO: validate the key
    return req.key === 'internal';
}

function error403(req) {
    var err = new Error();
    err.status = 403;
    throw err;
}

module.exports = function keyDataFilter(req, res, next) {
    var cap;
    if (req.key === 'public') {
        cap = capabilities[req.key];
    } else {
        cap = capabilities['internal'];
    }

    if (!cap) {
        error403(req);
        return;
    }

    if (! cap.reqIsValid(req)) {
        // This query is not allowed from this client
        error403(req);
        return;
    }
    
    req.dataContext = require("../../data/ldap/ldapContext")(cap);
    next();
}
