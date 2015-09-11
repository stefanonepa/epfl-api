"use strict";

var capabilities = {
    'internal': {
        reqControl: function (req) { return isInternal(req); },
        'view': function (u) { return u }
    },
    'public': {
        reqControl: function (req) { return true; },
        'view': function (u) { return u.asPublicData(); }
    }
}

function error403(req) {
    var err = new Error();
    err.status = 403;
    throw err;

}

module.exports = function accessValidator(req, res, next) {
    var cap = capabilities[req.key];

    if (!cap) {
        error403(req);
        return;
    }

    if (! cap.reqControl(req)) {
        // This query is not allowed from this client
        error403(req);
        return;
    }

    req.cap = cap;
    res.cap = cap;
    next();
}
