'use strict';
module.exports = function keyDataFilter(app) {

    function isInternal(req) {
        return app.keyContext.keys.isValid(req.key);
    }

    var middleware = function (req, res, next) {
        var viewModelsMapper;
        req.dataContext = require('epfl-ldap')();
        if (req.key === 'public') {
            viewModelsMapper = req.dataContext.viewModelsMappers.public;
        } else {
            if (isInternal(req)) {
                viewModelsMapper = req.dataContext.viewModelsMappers.full;
            } else {
                // This query is not allowed from this client
                throw new require('epfl-exceptions').ForbiddenException();
                return;
            }
        }
        req.dataContext.options.modelsMapper = viewModelsMapper;
        next();
    };

    return middleware;
};
 
