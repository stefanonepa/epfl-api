'use strict';
module.exports = function ldapContext(capability) {
    var options = require('./options')(capability, null);
    
    var context = {};
    context.client = require('./client')(options);
    context.validator = require('../../core/security/inputValidators');
    context.users = require('./repositories/users')(context);
    context.units = require('./repositories/units')(context);

    return context;
};