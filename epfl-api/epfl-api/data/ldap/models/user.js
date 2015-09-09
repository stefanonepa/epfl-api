"use strict";
module.exports = function User(ldapUserObject) {
    var userModel = {};
    userModel.username = ldapUserObject.uid[0];
    userModel.sciper = ldapUserObject.uniqueIdentifier;

    userModel.optionalProperties = ldapUserObject;
    return userModel;
};