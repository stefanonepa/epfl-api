"use strict";
module.exports = {
    isSciperValid: function(sciper) {
        //réf: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
        var regexp = /^((G\d{5})|\d{6})$/gi;
        var match = sciper.match(regexp);
        return match !== null;
    },
    
    //TODO: review the regexp
    isUnitAcronymValid: function (unitAcronym) {
        var regexp = /^(\d|-|\w){1,30}$/gi;
        var match = unitAcronym.match(regexp);
        return match !== null;
    },

    //TODO: review the regexp
    isNameQueryValid: function (namequery) {
        var regexp = /^(\w+(\s\w+)*)$/gi;
        var match = namequery.match(regexp);
        return match !== null;
    }
};