"use strict";
(function (ldapContext) {
    
    var options = require('./ldapOptions').defaults;
    ldapContext.validator = require('./ldapValidators');
    ldapContext.users = require('./repositories/person')(options);

})(module.exports);