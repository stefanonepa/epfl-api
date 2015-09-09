"use strict";
(function (ldapContext) {
    
    var options = require('./ldapOptions').defaults;
    ldapContext.validator = require('./ldapValidators');
    ldapContext.users = require('./repositories/person')(options);

    ldapContext.factories = {};
    ldapContext.factories.User = require('./models/user');

})(module.exports);