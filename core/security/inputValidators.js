'use strict';
module.exports = {
    isUserSciperValid: function(sciper) {
        //réf: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
        var regexp = /^((G\d{5})|\d{6})$/gi;
        var match = sciper.match(regexp);
        return match !== null;
    },
    
    //TODO: Not working: review the regexp
    isUserNameQueryValid: function (nameQuery) {
        return true;

        //var regexp = /^(\p{L}+(\s\p{L}+)*)$/gi;
        //var match = nameQuery.match(regexp);
        //return match !== null;S
    },
    
    isUserPhoneValid: function (phone) {
        return true;
    },

    //TODO: review the regexp
    isUnitAcronymValid: function (unitAcronym) {
        var regexp = /^(\w|-){1,30}$/gi;
        var match = unitAcronym.match(regexp);
        return match !== null;
    },
    
    isUnitIdValid: function (id) {
        return true;
    }

};