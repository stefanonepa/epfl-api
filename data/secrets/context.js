'use strict';
module.exports = function secretsContext() {
    var context = {};
    context.keys = require('./keys')();
    context.users = require('./users')();
    return context;
};