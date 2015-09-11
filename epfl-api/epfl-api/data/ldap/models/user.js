"use strict";
module.exports = function User(ldapUserObject) {
    var userModel = {};

    userModel.asPublicData = function () {
        return {
            sciper:userModel.sciper,
            email: userModel.email

        };
    }
    userModel.username = ldapUserObject.uid[0];
    userModel.sciper = ldapUserObject.uniqueIdentifier;
    userModel.email = "test@example.com";
    userModel.optionalProperties = ldapUserObject;
    return userModel;
};