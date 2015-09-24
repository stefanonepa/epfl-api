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

/**
 *
 * @constructor
 */
function ServerException() {
    this.message = 'Unknown Error',
    this.stack = (new Error()).stack;
}
ServerException.prototype = Object.create(Error.prototype);
ServerException.prototype.constructor = ServerException;

module.exports.ServerException = ServerException;

/**
 *
 * @constructor
 */
function ForbiddenException() {
    this.message = 'Forbidden access'
}
ForbiddenException.prototype = Object.create(Error.prototype);
ForbiddenException.prototype.constructor = ForbiddenException;

module.exports.ForbiddenException = ForbiddenException;