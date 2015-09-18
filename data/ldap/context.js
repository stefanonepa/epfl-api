"use strict";
module.exports = function ldapContext(capability) {
    var options = require('./options')(capability, null);
    var client = require("./client")(options);
    
    var context = {};
    context.validator = require('../../core/security/inputValidators');
    context.users = require('./repositories/users')(client);
    context.units = require('./repositories/units')(client);

    return context;
};