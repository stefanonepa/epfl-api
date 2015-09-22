'use strict';
/**
 *
 * @constructor
 */
function ParameterException(args) {
    this.parameterName = args.parameterName,
    this.message = args.message
}
ParameterException.prototype = Object.create(Error.prototype);
ParameterException.prototype.constructor = ParameterException;

module.exports.ParameterException = ParameterException;