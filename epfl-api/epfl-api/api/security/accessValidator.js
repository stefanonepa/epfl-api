﻿"use strict";
module.exports = function accessValidator(req, res, next) {
    //Validate the key with unique GUID stored in a db
    if (req.key === 'public') {
         return next();
    }
    res.redirect('error/403');
    //res.status(403).send('Forbidden');
}