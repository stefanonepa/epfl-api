"use strict";
(function (ldapOptions) {

    ldapOptions.defaults = {
        serverUrl : 'ldap://ldap.epfl.ch',
        searchBase : 'o=epfl,c=ch'
    };
    
})(module.exports);