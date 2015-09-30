'use strict';
module.exports = function (capability, customOptions) {
    var ldapOptions = {};

    ldapOptions.url = 'ldap://ldap.epfl.ch';
    if (customOptions != undefined) {
        ldapOptions.searchBase = customOptions.searchBase;
    } else {
        ldapOptions.searchBase = 'c=ch';
    }
    
    ldapOptions.capability = capability;
    return ldapOptions;
};