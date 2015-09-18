"use strict";
module.exports = {
    isSciperValid: function(sciper) {
        //réf: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
        var regexp = /^((G\d{5})|\d{6})$/gi;
        var match = sciper.match(regexp);
        return match !== null;
    }


};