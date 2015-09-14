"use strict";
module.exports = function ldapContext(capability) {
    var options = require('./ldapOptions')(capability, null);
    var client = require("./ldapClient")(options);
    
    var context = {};
    context.validator = require('./ldapValidators');
    context.users = require('./repositories/person')(client);
    
    return context;
};