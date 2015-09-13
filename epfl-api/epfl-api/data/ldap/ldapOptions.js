"use strict";
module.exports = function (customOptions) {
    var ldapOptions = {};

    ldapOptions.url = 'ldap://ldap.epfl.ch';
    ldapOptions.searchBase = 'o=epfl,c=ch';
    
    return ldapOptions;
};