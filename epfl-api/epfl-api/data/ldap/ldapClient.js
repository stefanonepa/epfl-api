"use strict";
module.exports = function ldapClient() {
    var ldapClient = {};
    var ldap = require('ldapjs');
    var client = ldap.createClient({
        url: options.url,
        timeLimit: 1,
        sizeLimit: 100
    });

    client.options;
    return client;
};