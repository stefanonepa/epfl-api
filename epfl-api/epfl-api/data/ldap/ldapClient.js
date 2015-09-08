"use strict";
(function (ldapClient) {
    ldapClient.getClient = function (url, next) {
        var ldap = require('ldapjs');
        var client = ldap.createClient({
            url: url,
            timeLimit: 1,
            sizeLimit: 100
        });
        
        return client;
    }
})(module.exports);