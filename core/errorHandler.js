"use strict";
module.exports = function ErrorHandler(err, req, res, next) {

    if (err.status === null ) {
        res.status(500);
        res.render('error', { error: err });
        console.log(err);
    }else if (err.status === 403) {
        res.status(403);
        res.send('Forbidden');
    }
    //next(err, req, res);
};