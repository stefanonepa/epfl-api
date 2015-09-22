'use strict';
module.exports = function (capability, customOptions) {
    var ldapOptions = {};

    ldapOptions.url = 'ldap://ldap.epfl.ch';
    ldapOptions.searchBase = 'c=ch';
    ldapOptions.capability = capability;
    return ldapOptions;
};