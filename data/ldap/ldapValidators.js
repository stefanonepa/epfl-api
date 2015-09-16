"use strict";
(function (ldapValidator) {
    
    ldapValidator.isSciperValid = function (sciper) {
        //réf: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
        var regexp = /(g)?\d{6}/gi ;  
        var match = sciper.match(regexp);
        return match !== null;
    };

})(module.exports);