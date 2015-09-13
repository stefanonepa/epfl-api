"use strict";
module.exports = function ldapContext(capability) {
    var options = require('./ldapOptions')(null);
    options.capability = capability;
    var client = require("./ldapClient");
    client.options = options;
    
    var context = {};
    context.validator = require('./ldapValidators');
    context.users = require('./repositories/person');
    context.users.client = client;

    return context;
};