'use strict';
var exceptions = require('./exceptions');
var ParameterException = exceptions.ParameterException;
var ServerException = exceptions.ServerException;
var ForbiddenException = exceptions.ForbiddenException;

module.exports = function ErrorHandler(err, req, res, next) {
    var viewName;
    var errorObject;
    
    //TODO Test instanceOf not working!
    if (err instanceof ParameterException) {
        res.status(409);
        viewName = 'errors/errorParameter';
        errorObject = err;
    } else if (err instanceof ForbiddenException) {
        res.status(403);
        viewName = 'errors/error403';
        errorObject = err;
    } else {
        res.status(500);
        viewName = 'errors/error500';
        errorObject = new ServerException();
    }
    
    if (req.xhr) {
        res.json(errorObject);
    } else {
        res.render(viewName, { error: errorObject });
    }
};