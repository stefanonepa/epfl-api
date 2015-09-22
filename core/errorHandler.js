'use strict';
var exceptions = require('./exceptions');
var ParameterException = exceptions.ParameterException;

module.exports = function ErrorHandler(err, req, res, next) {
    if (err instanceof ParameterException) {
        res.json({ errorType: 'Parameter error', message: err.message, parameterName: err.parameterName });
    }
    
    if (err.status === 403) {
        res.status(403);
        res.send('Forbidden');
    }else if (err.status === 500){
        res.status(500);
        res.send('Error');
        //res.render('error', { error: err });
        console.log(err);
    }
        //next(err, req, res);
};


//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});