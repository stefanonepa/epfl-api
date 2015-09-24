'use strict';
module.exports = function secretsContext() {
    var userKeys = {};
    var context = {};
    context.keys = require('./repositories/keys')(userKeys);
    //context.users = require('./repositories/clients')(userKeys);
    return context;
};