"use strict";
module.exports = function ldapClient(options) {
    var ldapClient = {};
    var ldap = require('ldapjs');
    var client = ldap.createClient({
        url: options.url,
        timeLimit: 1,
        sizeLimit: 100
    });

    client.options = options;
    return client;
};